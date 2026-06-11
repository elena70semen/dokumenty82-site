import { FormPlaceholder } from "@/components/forms/FormPlaceholder";

export function ShowDocumentsPlaceholder() {
  return (
    <FormPlaceholder
      eyebrow="Без загрузки файлов"
      title="Показать документы"
      text="Публичная страница не принимает файлы. Сначала согласуйте безопасный способ показа документов."
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
