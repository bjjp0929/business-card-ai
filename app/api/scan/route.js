import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name_zh: { type: 'string' },
    name_ko: { type: 'string' },
    name_en: { type: 'string' },
    company: { type: 'string' },
    department: { type: 'string' },
    title: { type: 'string' },
    mobile: { type: 'string' },
    phone: { type: 'string' },
    fax: { type: 'string' },
    email: { type: 'string' },
    website: { type: 'string' },
    address: { type: 'string' },
    notes: { type: 'string' }
  },
  required: [
    'name_zh', 'name_ko', 'name_en', 'company', 'department', 'title',
    'mobile', 'phone', 'fax', 'email', 'website', 'address', 'notes'
  ]
};

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: '伺服器尚未設定 OPENAI_API_KEY。' }, { status: 500 });
    }

    const formData = await request.formData();
    const image = formData.get('image');

    if (!image || typeof image === 'string') {
      return NextResponse.json({ error: '沒有收到圖片。' }, { status: 400 });
    }

    if (!image.type.startsWith('image/')) {
      return NextResponse.json({ error: '檔案不是圖片格式。' }, { status: 400 });
    }

    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '單張圖片不可超過 10 MB。' }, { status: 400 });
    }

    const bytes = Buffer.from(await image.arrayBuffer());
    const dataUrl = `data:${image.type};base64,${bytes.toString('base64')}`;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: '你是精確的多語名片資料辨識器。辨識中文、繁體中文、英文、韓文。只填寫圖片中可合理確認的資料，不要臆測。公司名稱保留原文；多個電話或地址可用「 / 」分隔。手機與公司電話要盡量區分。若欄位不存在，回傳空字串。notes 只放無法歸入其他欄位但有用的名片文字。'
            }
          ]
        },
        {
          role: 'user',
          content: [
            { type: 'input_text', text: '請辨識這張名片，依指定 JSON Schema 回傳。' },
            { type: 'input_image', image_url: dataUrl, detail: 'high' }
          ]
        }
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'business_card',
          strict: true,
          schema
        }
      }
    });

    const card = JSON.parse(response.output_text);
    return NextResponse.json({ card });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message || '伺服器辨識失敗。' },
      { status: 500 }
    );
  }
}
