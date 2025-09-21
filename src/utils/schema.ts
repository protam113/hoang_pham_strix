import z from 'zod';

export const zodIsNotEmptyString = (message: string) =>
  z
    .string()
    .trim()
    .refine((val) => val.length > 0, { message });

export const contactSentFormSchema = z.object({
  name: zodIsNotEmptyString('Tên không được để trống'),

  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Email không đúng định dạng'),

  phone_number: zodIsNotEmptyString('Số điện thoại không được để trống'),

  message: zodIsNotEmptyString('Vui lòng nhập nội dung tin nhắn'),
});
