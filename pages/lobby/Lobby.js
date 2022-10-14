import React, { useCallback, useEffect, useState } from "react";
// import LobbyHeader from '../../shared/components/LobbyHeader/LobbyHeader';
import LobbyDynamicGrid from "../../shared/components/LobbyDynamicGrid/LobbyDynamicGrid";
import BgImage from "../../media/temp/temp-bg.jpg";
import LobbyCard from "../../shared/components/LobbyCard/LobbyCard";
import LobbyThumb from "../../shared/components/LobbyThumb/LobbyThumb";
import LobbyInfo from "../../shared/components/LobbyInfo/LobbyInfo";
import LobbyContainer from "../../shared/components/LobbyContainer/LobbyContainer";
import HistoryBoard from "../../shared/components/History/HistoryBoard/HistoryBoard";
import GamesNav from "../../shared/components/GamesNav/GamesNav";

import styles from "./Lobby.module.scss";

import { getUser } from "../../store/actions/user-actions";
import { getTables } from "../../store/actions/table-actions";
import { useDispatch, useSelector } from "react-redux";

import { getHistory } from "../../store/actions/history-actions";
import { mapIconBigRoad, generateCoordinates} from "../../store/actions/game-logic-actions";


const Lobby = () => {
  const dispatch = useDispatch();

  const tables = useSelector((state) => state.tables.tableList);
  const history = useSelector((state) => state.tables.tableHistory);

  const [activeTab, setActiveTab] = useState("SPEED_BACCARAT");
  const [displayArray, setDisplayArray] = useState([]);

  const [minColsBig, setMinColsBig] = useState(25);

  useEffect(() => {                                       
    // initial Render
    tables.forEach((item) => {
      dispatch(getHistory(item.id))
    });

    const interval = setInterval(() => {
      tables.forEach((item) => {
        dispatch(getHistory(item.id))
      })
    }, 30000);  
    return () => clearInterval(interval);

  }, [tables]);

  const getShoeHistory = useCallback( (table_id) => {
    let bigRoad;
    if(Object.keys(history).length) {
      let table_history = history[table_id];
      bigRoad = genereteBigRoad(table_history);
    }  
    return bigRoad;
  },[dispatch, history]);

  const genereteBigRoad = useCallback((shoe_history) => {
    //Map the backend history to frontend
    let roundInfo;
    let game_type;

    if (shoe_history?.length) {
      let temp_array = [];
      let previousWinner = null;

      let x = 1,
        y = 1;
      let dragon_x; //stores the x when the dragon tail is formed

      const used_coordinates = [];
      shoe_history.forEach((round_info, index) => {
        if(round_info.state.baccarat) {
          roundInfo = round_info.state.baccarat;
          game_type = 0;
          } else if (round_info.state.dragon_tiger){
            roundInfo = round_info.state.dragon_tiger;
            game_type = 1;
          } else {
            roundInfo = round_info.state.jackarat;
            game_type = 2;
          }


        let item = {
          x: null,
          y: null,
          icon: "",
        };

        if (index === 0) {
          //creates the first bead
          item.x = x;
          item.y = y;
          item.icon = mapIconBigRoad(
            roundInfo.winner,
            game_type
          );
        } else {
          let new_coordinates = generateCoordinates(
            x,
            y,
            dragon_x,
            previousWinner,
            roundInfo.winner,
            used_coordinates,
            temp_array
          );

          item.icon = mapIconBigRoad(
            roundInfo.winner,
            game_type
          );

          if (new_coordinates[2]) {
            //if there is a dragon tail

            item.x = new_coordinates[2]; //use the dragon tail x
            item.y = new_coordinates[1];

            dragon_x = new_coordinates[2];
            y = new_coordinates[1];
          } else {
            //no dragon tail

            item.x = new_coordinates[0];
            item.y = new_coordinates[1];
            dragon_x = null;
            x = new_coordinates[0];
            y = new_coordinates[1];
          }
        }

        //if it is a tie --> keep the color of the previous winner
        if (roundInfo.winner !== "TIE") { // roundInfo.winner !== 'tie'
          previousWinner = roundInfo.winner;
        } else {
          temp_array.pop();
        }
        used_coordinates.push([item.x, item.y, previousWinner]);
        temp_array.push(item);
      });

      if (temp_array[temp_array.length - 1].x > minColsBig) {
        setMinColsBig((prevState) => prevState++);
      }
      return temp_array;
    }
  }, []);

  useEffect(() => {
    dispatch(getTables());
    dispatch(getUser());
  }, [dispatch]);

  const selectedTableHandler = (table_index) => {
    let user_auth_info = {
      type: "auth_user",
      token: sessionStorage.getItem("token"),
      token_exp: sessionStorage.getItem("token_exp"),
    };

    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {//development mode
      if (tables[table_index].game_rules.game_type === "SPEED_BACCARAT") {
        //Baccarat
        document.getElementById("baccarat-dev").contentWindow.postMessage(user_auth_info, "http://localhost:3001");
        window.location.href ="http://localhost:3001?table-id=" + tables[table_index].id;
      } else if (tables[table_index].game_rules.game_type === "JACKARAT") {
        //DT
        document.getElementById("jackarat-dev").contentWindow.postMessage(user_auth_info, "http://localhost:3001");
        window.location.href ="http://localhost:3001?table-id=" + tables[table_index].id;
      } else if (tables[table_index].game_rules.game_type === "DRAGON_TIGER") {
        //DT
        document.getElementById("dragon-tiger-dev").contentWindow.postMessage(user_auth_info, "http://localhost:3001");
        window.location.href ="http://localhost:3001?table-id=" + tables[table_index].id;
      } else if (
        tables[table_index].game_rules.game_type === "AMERICAN_ROULETTE"
      ) {
        document.getElementById("us-roulette-dev").contentWindow.postMessage(user_auth_info, "http://localhost:3001");
        window.location.href ="http://localhost:3001?table-id=" + tables[table_index].id;
      } else if (
        tables[table_index].game_rules.game_type === "EUROPEAN_ROULETTE"
      ){
        document.getElementById("eu-roulette-dev").contentWindow.postMessage(user_auth_info, "http://localhost:3001");
        window.location.href ="http://localhost:3001?table-id=" + tables[table_index].id;
      }
    }else{//Production mode

      //Production PROD URL
      if(window.location.hostname === "mlobby.s21games.com"){

        if (tables[table_index].game_rules.game_type === "SPEED_BACCARAT") {
          document.getElementById("baccarat-deployed-prod").contentWindow.postMessage(user_auth_info, "https://mbkr.s21games.com");
          window.location.href ="https://mbkr.s21games.com?table-id=" + tables[table_index].id;
        } 
        else if (tables[table_index].game_rules.game_type === "JACKARAT") {
          document.getElementById("jackarat-deployed-prod").contentWindow.postMessage(user_auth_info, "https://mjkr.s21games.com/");
          window.location.href ="https://mjkr.s21games.com?table-id=" + tables[table_index].id;
        } 
        else if (tables[table_index].game_rules.game_type === "DRAGON_TIGER") {
          document.getElementById("dragon-tiger-deployed-prod").contentWindow.postMessage(user_auth_info, "https://mdt.s21games.com");
          window.location.href ="https://mdt.s21games.com?table-id=" + tables[table_index].id;
        }
        else if(tables[table_index].game_rules.game_type === "AMERICAN_ROULETTE"){
          document.getElementById("us-roulette-deployed-prod").contentWindow.postMessage(user_auth_info, "https://mroulette-us.s21games.com");
          window.location.href ="https://mroulette-us.s21games.com?table-id=" + tables[table_index].id;
        }
        else if (
          tables[table_index].game_rules.game_type === "EUROPEAN_ROULETTE"
        ){
          document.getElementById("eu-roulette-deployed-prod").contentWindow.postMessage(user_auth_info, "https://mroulette-eu.s21games.com/");
          window.location.href ="https://mroulette-eu.s21games.com?table-id=" + tables[table_index].id;
        }
      //PRODUCTION DEV URL
      }else if(window.location.hostname === "lobby-mobile-dev.s21games.com"){

        if (tables[table_index].game_rules.game_type === "SPEED_BACCARAT") {
          document.getElementById("baccarat-deployed-dev").contentWindow.postMessage(  user_auth_info,  "https://baccarat-mobile-dev.s21games.com");
          window.location.href ="https://baccarat-mobile-dev.s21games.com?table-id=" + tables[table_index].id;
        } 
        else if (tables[table_index].game_rules.game_type === "JACKARAT") {
          document.getElementById("jackarat-deployed-dev").contentWindow.postMessage(user_auth_info, "https://jackarat-mobile-dev.s21games.com");
          window.location.href ="https://jackarat-mobile-dev.s21games.com?table-id=" + tables[table_index].id;
        } 
        else if (tables[table_index].game_rules.game_type === "DRAGON_TIGER") {
          document.getElementById("dragon-tiger-deployed-dev").contentWindow.postMessage(user_auth_info, "https://dragontiger-mobile-dev.s21games.com");
          window.location.href ="https://dragontiger-mobile-dev.s21games.com?table-id=" + tables[table_index].id;
        } 
        else if(tables[table_index].game_rules.game_type === "AMERICAN_ROULETTE"){
          document.getElementById("us-roulette-deployed-dev").contentWindow.postMessage(user_auth_info, "https://usroulette-mobile-dev.s21games.com");
          window.location.href ="https://usroulette-mobile-dev.s21games.com?table-id=" + tables[table_index].id;
        }
        else if (
          tables[table_index].game_rules.game_type === "EUROPEAN_ROULETTE"
        ){
          document.getElementById("eu-roulette-deployed-dev").contentWindow.postMessage(user_auth_info, "https://euroulette-mobile-dev.s21games.com");
          window.location.href ="https://euroulette-mobile-dev.s21games.com?table-id=" + tables[table_index].id;
        }
      }
    }
  }; 
  // console.log(tables);

  useEffect(() => {
    if (tables.length) {
      let mappedArray = tables.map((item, index) => {
        let displayBigRoad = getShoeHistory(item.id)
        const jackarat =
          activeTab === "SPEED_BACCARAT"? item.game_rules.game_type === "JACKARAT": false;
        if (item.game_rules.game_type === activeTab || jackarat) {
          return (
            // <div></div>
            <LobbyCard
              className={styles.card}
              key={index}
              onClick={() => {
                selectedTableHandler(index);
              }}>
              <LobbyThumb
                dealerName={item.dealer}
                roomName={item.name}
                imageUrl="http://www.firstnightharrisonburg.com/wp-content/uploads/2020/09/Categories-LIVE.jpg"
                videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                className={styles.thumb}
              />
              <LobbyInfo
                limit={item.min_bet + " - " + item.max_bet}
                users={item.players_count + ""}
                className={styles.info}
              />
              <LobbyContainer className={styles.container}>
                <HistoryBoard
                  cols={26}
                  className={styles.board}
                  items={displayBigRoad ? displayBigRoad : []}
                />
              </LobbyContainer>
            </LobbyCard>
          );
        }
      });
      setDisplayArray(mappedArray);
    }
  }, [tables, activeTab, history]);

  return (
    <div className={styles.lobby}>
      <div className={styles.background}>
        <img src={BgImage} alt="bg" className={styles.image} />
      </div>
      <GamesNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <LobbyDynamicGrid heading="Lobby">
        {displayArray}
        <iframe src="https://baccarat-mobile-dev.s21games.com/" id="baccarat-deployed-dev"style={{ display: "none" }}></iframe>
        <iframe src="https://dragontiger-mobile-dev.s21games.com/" id="dragon-tiger-deployed-dev" style={{ display: "none" }}></iframe>
        <iframe src="https://jackarat-mobile-dev.s21games.com/" id="jackarat-deployed-dev"style={{ display: "none" }}></iframe>
        <iframe src="hhttps://usroulette-mobile-dev.s21games.com/" id="us-roulette-deployed-dev" style={{ display: "none" }}></iframe>
        <iframe src="https://euroulette-mobile-dev.s21games.com/" id="eu-roulette-deployed-dev" style={{ display: "none" }}></iframe>

        <iframe src="https://mbkr.s21games.com/" id="baccarat-deployed-prod" style={{ display: "none" }}></iframe>
        <iframe src="https://mdt.s21games.com/" id="dragon-tiger-deployed-prod" style={{ display: "none" }}></iframe>
        <iframe src="https://mjkr.s21games.com/" id="jackarat-deployed-prod" style={{ display: "none" }}></iframe>
        <iframe src="https://mroulette-us.s21games.com" id="us-roulette-deployed-prod" style={{ display: "none" }}></iframe>
        <iframe src="https://mroulette-eu.s21games.com" id="eu-roulette-deployed-prod" style={{ display: "none" }}></iframe>

        <iframe src="http://localhost:3001"id="dragon-tiger-dev"style={{ display: "none" }}></iframe>
        <iframe src="http://localhost:3001"id="baccarat-dev"style={{ display: "none" }}></iframe>
        <iframe src="http://localhost:3001"id="jackarat-dev"style={{ display: "none" }}></iframe>
        <iframe src="http://localhost:3001"id="us-roulette-dev"style={{ display: "none" }}></iframe>
        <iframe src="http://localhost:3001"id="eu-roulette-dev"style={{ display: "none" }}></iframe>
      </LobbyDynamicGrid>
    </div>
  );
};

export default Lobby;
