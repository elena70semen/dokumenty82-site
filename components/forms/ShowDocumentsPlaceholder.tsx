import { FormPlaceholder } from "@/components/forms/FormPlaceholder";

type ShowDocumentsPlaceholderProps = {
  pageSlug?: string;
  pageType?: string;
  leadTopic?: string;
};

export function ShowDocumentsPlaceholder({ pageSlug = "show-documents", pageType = "money", leadTopic = "show_documents" }: ShowDocumentsPlaceholderProps) {
  return (
    <FormPlaceholder
      eyebrow="Без загрузки файлов"
      title="Согласуем безопасный способ"
      text="Файлы не нужно отправлять через сайт. Сначала договоримся, как удобнее и безопаснее показать документы."
      pageSlug={pageSlug}
      pageType={pageType}
      leadTopic={leadTopic}
      fields={[
        {
          id: "document-topic",
          label: "Тема документа",
          placeholder: "Например: требование, запрос банка, декларация",
          multiline: true
        },
        {
          id: "what-to-show",
          label: "Что нужно показать",
          placeholder: "Кратко опишите состав документов без прикрепления файлов",
          multiline: true
        },
        {
          id: "contact",
          label: "Контакт",
          placeholder: "+7 ...",
          type: "tel"
        }
      ]}
    />
  );
}
