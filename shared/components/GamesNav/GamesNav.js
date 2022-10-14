import PropTypes from "prop-types";

import Icon from "../Icon/Icon";

import styles from "./GamesNav.module.scss";

/*
 * ============================Game nav specs==============================
 * Component functionality - Rendered in lobby page that display the navigation tabs with the corresponding game.
 * ========================================================================
 */
const GamesNav = ({ activeTab, setActiveTab }) => {
  const className = (active) => {
    if (active === activeTab) return `${styles.item} ${styles.active}`;

    return `${styles.item}`;
  };

  return (
    <nav className={styles.nav}>
      <div
        className={className("TOP_GAMES")}
        onClick={() => setActiveTab("TOP_GAMES")}>
        <Icon icon="top-games" className={styles.icon} />
        <span className={styles.title}>Top games</span>
      </div>
      <div
        className={className("SPEED_BACCARAT")}
        onClick={() => setActiveTab("SPEED_BACCARAT")}>
        <Icon icon="bacarrat-icon" className={styles.icon} />
        <span className={styles.title}>Baccarat</span>
      </div>
      <div
        className={className("DRAGON_TIGER")}
        onClick={() => setActiveTab("DRAGON_TIGER")}>
        <Icon
          icon="dragon_tiger"
          className={`${styles.icon} ${styles.dtIcon}`}
        />
        <span className={styles.title}>Dragon Tiger</span>
      </div>
      <div
        className={className("AMERICAN_ROULETTE")}
        onClick={() => setActiveTab("AMERICAN_ROULETTE")}>
        <Icon icon="roulette" className={styles.icon} />
        <span className={styles.title}>Roulette</span>
      </div>
    </nav>
  );
};

GamesNav.prototype = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default GamesNav;
