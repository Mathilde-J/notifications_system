import React from "react";
import style from "./style.module.css";

interface MessagesTablesProps {
  title: string;
}

const MessagesTable: React.FC<MessagesTablesProps> = ({ title }) => {
  console.log("🚀 ~ MessagesTable ~ title:", title);
  return (
    <div className={style.messages_page_table_container}>
      <table className={style.messages_page_table}>
        <thead>
          <tr>
            <th>Colonne 1</th>
            <th>Colonne 2</th>
            <th>Colonne 3</th>
            <th>Colonne 4</th>
            <th>Colonne 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Données 1</td>
            <td>Données 2</td>
            <td>Données 3</td>
            <td>Données 4</td>
            <td>Données 5</td>
          </tr>
          <tr>
            <td>Données 1</td>
            <td>Données 2</td>
            <td>Données 3</td>
            <td>Données 4</td>
            <td>Données 5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MessagesTable;
