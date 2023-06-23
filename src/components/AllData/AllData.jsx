import s from './AllData.module.css';
import loader from '../../assets/img/XOsX.gif';

const AllData = (props) => {
  const workers = [...props.workers];

  return (
    <div className={s.wrapper}>
        <h1 class={s.main_header}>
          Список
        </h1>
      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ПІБ</th>
            <th scope="col">Дата початку співпраці</th>
            <th scope="col">Email</th>
            <th scope="col">Посада</th>
          </tr>
        </thead>
        <tbody>
          {props.workers.map(worker => {
            return <DataRow worker={worker}/>
          })}
        </tbody>
      </table>
      
      {props.isFetching ? (
        <button className={s.button_fetch}>
          <img src={loader}/>
        </button>
      ) : (
        <button className={s.button_fetch} onClick={props.onButtonClicked}>Get workers</button>
      )} 
    </div>
  )
}

const DataRow = (props) => {
  return (
    <tr>
      <td className={s.id}>{props.worker.id}</td>
      <td>{`${props.worker.first_name} ${props.worker.last_name} ${props.worker.patronymic}`}</td>
      <td>{props.worker.date_start}</td>
      <td>{props.worker.email}</td>
      <td>{props.worker.profession}</td>
    </tr>
  );
}

export default AllData