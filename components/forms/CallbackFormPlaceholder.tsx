import { FormPlaceholder } from "@/components/forms/FormPlaceholder";

export function CallbackFormPlaceholder() {
  return (
    <FormPlaceholder
      eyebrow="Форма-заглушка"
      title="Заказать звонок"
      text="Онлайн-заявка пока не отправляется. Используйте форму как черновик вопроса и fallback на телефон."
      pageSlug="kontakty"
      pageType="contact"
      leadTopic="callback_request"
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
