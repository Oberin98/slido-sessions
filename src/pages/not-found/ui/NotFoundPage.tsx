import { useNavigate } from 'react-router-dom';

import * as styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHomeClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.root}>
      <h1>Oops! The page you are trying to access does not exist.</h1>
      <button onClick={handleGoHomeClick}>Go home</button>
    </div>
  );
}

export default NotFoundPage;
