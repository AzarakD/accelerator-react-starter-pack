import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import Catalog from './components/catalog/catalog';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Icons from '../common/icons/icons';

export default function Main(): JSX.Element {
  return (
    <>
      <Icons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <Breadcrumbs />
            <Catalog />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
