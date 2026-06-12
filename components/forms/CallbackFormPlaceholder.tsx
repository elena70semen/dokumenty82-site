import { FormPlaceholder } from "@/components/forms/FormPlaceholder";

type FormPlaceholderContext = {
  pageSlug?: string;
  pageType?: string;
  leadTopic?: string;
};

export function CallbackFormPlaceholder({ pageSlug, pageType, leadTopic }: FormPlaceholderContext) {
  return (
    <FormPlaceholder
      eyebrow="Форма-заглушка"
      title="Заказать звонок"
      text="Онлайн-заявка пока не отправляется. Используйте форму как черновик вопроса и fallback на телефон."
      pageSlug={pageSlug}
      pageType={pageType}
      leadTopic={leadTopic}
      ctaLocation="callback_form_placeholder"
      fields={[
        {
          id: "name",
          label: "Имя",
          placeholder: "Как к вам обращаться"
        },
        {
          id: "phone",
          label: "Телефон",
          placeholder: "+7 ...",
          type: "tel"
        },
        {
          id: "question",
          label: "Короткий вопрос",
          placeholder: "Опишите тему звонка",
          multiline: true
        }
      ]}
    />
  );
}
