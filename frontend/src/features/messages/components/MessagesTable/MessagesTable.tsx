import React, { type TableHTMLAttributes } from "react";
import style from "./style.module.css";

const MessagesTable: React.FC<TableHTMLAttributes<HTMLTableElement>> = ({
  ...rest
}) => {
  return (
    <div className={style.messages_page_table_container}>
      <table {...rest} className={style.messages_page_table}>
        <caption className="sr_only">Messages envoyé</caption>
        <thead>
          <tr>
            <th scope="col">Colonne 1</th>
            <th scope="col">Colonne 2</th>
            <th scope="col">Colonne 3</th>
            <th scope="col">Colonne 4</th>
            <th scope="col">Colonne 5</th>
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
