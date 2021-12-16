export default function Breadcrumbs(): JSX.Element {
  return (
    <>
      <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <a className="link" href="./main.html">Главная</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="link" href="#todo">Каталог</a>
        </li>
      </ul>
    </>
  );
}
