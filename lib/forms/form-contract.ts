import { attributionParamKeys } from "@/lib/tracking/event-context";

export const formsLive = false;

export const formVisibleFieldIds = [
  "name",
  "phone",
  "contact",
  "client_type",
  "lead_topic",
  "lead_urgency",
  "lead_has_documents",
  "preferred_contact",
  "situation_summary",
  "situation",
  "documents",
  "question",
  "document-topic",
  "what-to-show"
] as const;

export const formHiddenAttributionFieldIds = [
  ...attributionParamKeys,
  "page_slug",
  "page_type",
  "cta_label",
  "cta_location",
  "lead_topic_hidden"
] as const;

export const formLeadTopics = [
  "first_step",
  "callback_request",
  "show_documents",
  "phone_contact",
  "office_route",
  "otvet_na_trebovanie_ifns",
  "otvet_na_zapros_banka",
  "dokumenty_dlya_banka_115_fz",
  "deklaraciya_usn",
  "registration",
  "legal_address",
  "other"
] as const;

export const disabledFormSubmitMessage =
  "Онлайн-отправка пока не подключена. Чтобы не потерять вопрос, позвоните или перейдите в контакты.";

export const formPolicyNotice =
  "Форма работает как черновик вопроса. Не отправляйте персональные данные и документы через открытый публичный поток.";

export type FormVisibleFieldId = (typeof formVisibleFieldIds)[number];
export type FormHiddenAttributionFieldId = (typeof formHiddenAttributionFieldIds)[number];
export type FormLeadTopic = (typeof formLeadTopics)[number];
