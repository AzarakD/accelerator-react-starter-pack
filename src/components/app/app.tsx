import Icons from '../common/icons/icons';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Catalog from '../catalog/catalog';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';

export default function App(): JSX.Element {
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
