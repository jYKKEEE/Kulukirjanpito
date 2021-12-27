import styles from "./edititem.module.scss";
import ItemForm from "../../components/itemform";
import { useParams } from "react-router-dom";

function EditItem(props) {
  const { onItemSubmit, data, types, onItemDelete } = props;
  const { id } = useParams();
  const index = data.findIndex((item) => item.id === id);
  let item = data[index];

  return (
    <div className={styles.edititem}>
      <h2>Merkinnän muokkaaminen</h2>
      <ItemForm
        onItemSubmit={onItemSubmit}
        data={item}
        types={types}
        onItemDelete={onItemDelete}
      />
    </div>
  );
}
export default EditItem;
