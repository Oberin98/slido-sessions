import { useRouteError } from 'react-router-dom';

import * as styles from './ErrorPage.module.css';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={styles.root}>
      <h1>Oops! Something went wrong.</h1>
      {error instanceof Error && <p>{error.message}</p>}
    </div>
  );
}

export default ErrorPage;
