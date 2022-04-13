import styles from "../styles/navbar.module.css";

export const NavBar: React.FC = () => (
    <nav className={styles.navbar}>
        <a href="/">Calculator</a>
        <a href="complex">Complex Subset Sketcher</a>
        <a href="https://github.com/kowasaur/matrixey">Github</a>
    </nav>
);
