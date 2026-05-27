import React, { type TableHTMLAttributes } from "react";
import style from "./style.module.css";
import { motion } from "motion/react";
import type { Message } from "../../types/message";
import type { LabelTypeKey } from "../../../../shared/components/constant";
import { AppLabel } from "../../../../shared/components/appLabel/AppLabel";

interface MessagesTableProps extends TableHTMLAttributes<HTMLTableElement> {
  data: Message[] | undefined;
}

type ColumnKey = keyof Message;
interface Column {
  key: ColumnKey;
  label: string;
  render?: (value: Message[ColumnKey]) => React.ReactNode;
}

const columns: Column[] = [
  {
    key: "sentAt",
    label: "Date",
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    key: "messageType",
    label: "Type",
    render: (value) => <AppLabel type={value as LabelTypeKey} />,
  },
  { key: "sender", label: "Expéditeur" },
  { key: "receiver", label: "Destinataire" },
  {
    key: "status",
    label: "Statut",
    render: (value) => <AppLabel type={value as LabelTypeKey} />,
  },
];

const MessagesTable: React.FC<MessagesTableProps> = ({ data, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={style.messages_page_table_container}
    >
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
    </motion.div>
  );
};

export default MessagesTable;
