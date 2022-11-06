import Item from '../Item/Item';
function ToDoList({ items, changeData}) {
    console.log(items);
    return (
        <div>
            {items.map((item) => <Item key={item.id} item={item} changeData={changeData}/>)}
        </div>
    )
}
export default ToDoList;