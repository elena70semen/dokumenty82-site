import { FormPlaceholder } from "@/components/forms/FormPlaceholder";

type FormPlaceholderContext = {
  pageSlug?: string;
  pageType?: string;
  leadTopic?: string;
};

export function SituationFormPlaceholder({ pageSlug, pageType, leadTopic }: FormPlaceholderContext) {
  return (
    <FormPlaceholder
      eyebrow="Форма-заглушка"
      title="Кратко описать ситуацию"
      text="Для первого шага достаточно зафиксировать контекст без передачи конфиденциальных документов через сайт."
      pageSlug={pageSlug}
      pageType={pageType}
      leadTopic={leadTopic}
      ctaLocation="situation_form_placeholder"
      fields={[
        {
          id: "situation",
          label: "Ситуация",
          placeholder: "Что произошло или какой запрос получен",
          multiline: true
        },
        {
          id: "documents",
          label: "Какие документы уже есть",
          placeholder: "Кратко перечислите для себя"
        },
        {
          id: "contact",
          label: "Телефон или способ связи",
          placeholder: "+7 ...",
          type: "tel"
        }
      ]}
    />
  );
}
