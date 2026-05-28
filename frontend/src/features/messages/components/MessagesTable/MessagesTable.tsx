import React, { type TableHTMLAttributes } from "react";
import style from "./style.module.css";
import { motion } from "motion/react";
import type { Message } from "../../types/message";
import type { LabelTypeKey } from "../../../../shared/components/constant";
import { AppLabel } from "../../../../shared/components/appLabel/AppLabel";
import { useMessages } from "../../hooks/useMessages/useMessages";
import { AppLoading } from "../../../../shared/components/appLoading/AppLoading";

type ColumnKey = keyof Message;
interface Column {
  key: ColumnKey;
  label: string;
  render?: (value: Message[ColumnKey]) => React.ReactNode;
}


const columns: Column[] = [
  {
    key: "messageType",
    label: "Type",
    render: (value) => <AppLabel type={value as LabelTypeKey} />,
  },
  { key: "sender", label: "Expéditeur" },
  { key: "receiver", label: "Destinataire" },
  {
    key: "sentAt",
    label: "Date",
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    key: "status",
    label: "Statut",
    render: (value) => <AppLabel type={value as LabelTypeKey} />,
  },
];

export const MessagesTable: React.FC<TableHTMLAttributes<HTMLTableElement>> = ({
  ...rest
}) => {
  const { data, error, isLoading } = useMessages();
  return (
    <motion.div
      initial={{ opacity: 0, flexGrow: 0 }}
      animate={{ opacity: 1, flexGrow: 1 }}
      transition={{ duration: 0.5 }}
      className={style.messages_page_table_container}
    >
      {isLoading && <AppLoading />}
      {error && <p>Erreur : une erreur est survenue</p>}
      {data && (
        <table {...rest} className={style.messages_page_table}>
          <caption className="sr_only">Messages envoyés</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((message) => (
                <tr key={message.id}>
                  {columns.map((column) => {
                    return (
                      <td key={column.key}>
                        {column.render
                          ? column.render(message[column.key])
                          : String(message[column.key] ?? "-")}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};
