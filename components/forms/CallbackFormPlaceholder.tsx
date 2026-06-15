import { FormPlaceholder } from "@/components/forms/FormPlaceholder";

export function CallbackFormPlaceholder() {
  return (
    <FormPlaceholder
      eyebrow="Связаться с офисом"
      title="Заказать звонок"
      text="Коротко сформулируйте вопрос для себя, а затем позвоните или перейдите в контакты, чтобы согласовать следующий шаг."
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
