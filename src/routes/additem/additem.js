import styles from "./additem.module.scss";
import ItemForm from "../../components/itemform";

function AddItem({ onItemSubmit, types }) {
  return (
    <div className={styles.additem}>
      <h2>Uuden merkinnän lisääminen</h2>
      <ItemForm onItemSubmit={onItemSubmit} types={types} />
    </div>
  );
}
export default AddItem;
