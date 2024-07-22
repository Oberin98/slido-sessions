import * as styles from './MainLayout.module.css';

function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.root}>
      <header>
        <h1>Slido Sessions Example App</h1>
      </header>

      {children}
    </div>
  );
}

export default MainLayout;
