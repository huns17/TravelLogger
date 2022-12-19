/* eslint-disable import/no-webpack-loader-syntax */
import { useState, useEffect } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import "mapbox-gl/dist/mapbox-gl.css";
import StarIcon from "@mui/icons-material/Star";
import "./MapPin.css";
import axios from "axios";
import { format } from "timeago.js";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import { Source, Layer } from "react-map-gl";
import { useQueryComplicatedFetchHooks } from "../../../hooks/useQueryFetchHooks";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { usersActions } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

// eslint-disable-next-line import/no-webpack-loader-syntax
// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface pinDataType {
  _id: string;
  username: string;
  title: string;
  rating: number;
  desc: string;
  lat: number;
  long: number;
  createdAt: string;
  updatedAt: string;
}

interface pinObjectDataType {
  title: string;
  desc: string;
  rating: string;
}

interface newPlaceDataType {
  lat: number;
  long: number;
}

function MapPin() {
  const [viewState, setViewState] = useState({
    longitude: 126.9728,
    latitude: 37.55884,
    zoom: 6.1,
  });
  const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
  const [newPlace, setNewPlace] = useState<newPlaceDataType | null>();
  const [pins, setPins] = useState<pinDataType[]>();
  const [pinObject, setPinObject] = useState<pinObjectDataType>({
    title: "",
    desc: "",
    rating: "1",
  });
  const reduxUserName: string = useAppSelector((state) => state.user);
  const reduxToken: string = useAppSelector((state) => state.token);
  const [currentUser, setCurrentUser] = useState<string>(reduxUserName);
  const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  // React query responses
  const onSuccess = (data: any) => {
    setPins(data?.data);
    console.log("Sucess", data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const {
    data: pinView,
    isFetching,
    isError,
    refetch: pinRefetch,
  } = useQueryComplicatedFetchHooks(
    onSuccess,
    onError,
    "https://hans-node-api.herokuapp.com/api/v1/pins/",
    300000,
    true,
    "PinView",
    5000,
    true,
    reduxToken
  );

  // Load pin when page is fistly rendered
  useEffect(() => {
    pinRefetch();
  }, []);

  // Dialog Handler
  const dialogRegisterClickHandler = () => {
    setOpenRegisterDialog(true);
  };

  const dialogRegisterCloseHandler = (event?: any, reason?: string) => {
    if (reason && reason === "backdropClick") return;
    setOpenRegisterDialog(false);
  };

  // Handler function
  const MarkerClickHandler = (id: string, lat: number, long: number) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const AddClickhandler = (e: mapboxgl.MapLayerMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({ lat, long: lng });
  };

  const deletePinHandler = async (id: string) => {
    if (reduxToken) {
      try {
        const jwtConfig = {
          headers: {
            Authorization: "Bearer " + reduxToken,
          },
        };
        const res = await axios.delete(
          `https://hans-node-api.herokuapp.com/api/v1/pins/${id}`,
          jwtConfig
        );
        const tempPins = pins?.filter((item: any) => item._id !== id);
        setPins(tempPins);
        setCurrentPlaceId(null);
        alert("Pin is successfully deleted.");
      } catch (err) {
        if (err instanceof AxiosError) {
          alert(err?.response?.data?.message);
        }
      }
    } else if (!reduxToken) {
      alert("You don't have valid token. Please log in again.");
      localStorage.clear();
      dispatch(usersActions.reset());
      navigate("/singIn");
    }
  };

  const pinObjectChangeHandler = (e: any) => {
    setPinObject((prev: pinObjectDataType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Button function
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reduxToken) {
      if (!pinObject?.title || !pinObject?.desc || !pinObject?.rating) {
        alert("Plase enter required fields.");
      } else if (pinObject?.title && pinObject?.desc && pinObject?.rating) {
        const jwtConfig = {
          headers: {
            Authorization: "Bearer " + reduxToken,
          },
        };
        const newPin = {
          ...pinObject,
          username: currentUser,
          lat: newPlace?.lat,
          long: newPlace?.long,
          rating: Number(pinObject?.rating),
        };
        try {
          const res = await axios.post(
            "https://hans-node-api.herokuapp.com/api/v1/pins/",
            newPin,
            jwtConfig
          );
          setPinObject({
            title: "",
            desc: "",
            rating: "1",
          });
          setPins([...pins!, res.data.data]);
          setNewPlace(null);
          alert("Pin is successfully added.");
        } catch (err) {
          if (err instanceof AxiosError) {
            alert(err?.response?.data?.message);
          }
        }
      }
    } else if (!reduxToken) {
      alert("You don't have valid token. Please log in again.");
      localStorage.clear();
      dispatch(usersActions.reset());
      navigate("/singIn");
    }
  };

  const getUsername = (username: string) => {
    setCurrentUser(username);
  };

  //When there is no username once appliation is start, then pop up will appear
  useEffect(() => {
    if (reduxUserName) {
      setCurrentUser(reduxUserName);
    }
  }, [currentUser, reduxUserName]);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [126.9893443156451, 37.54724975413757],
        [127.38698585058893, 36.34614001027323],
        [129.07376147749494, 35.179315934581425],
      ],
    },
  };

  const dataTwo = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [129.3535702194697, 36.011321336957465],
        [128.60614846858937, 35.861707072408805],
        [128.32359012616735, 36.12567038367847],
        [127.91271892162314, 37.3542384179236],
      ],
    },
  };

  return (
    <>
      <Map
        {...viewState}
        style={{ width: "100vw", height: "100vh" }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="..."
        onDblClick={AddClickhandler}
      >
        {!pins
          ? null
          : pins?.map((p: pinDataType) => {
              return (
                <>
                  <Marker longitude={p?.long} latitude={p?.lat} anchor="center">
                    <RoomIcon
                      style={{
                        fontSize: viewState.zoom * 5,
                        color:
                          p?.username === currentUser ? "tomato" : "slateblue",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        MarkerClickHandler(p?._id, p?.lat, p?.long)
                      }
                    />
                  </Marker>
                  {p?._id === currentPlaceId && (
                    <Popup
                      key={p?._id}
                      longitude={p?.long}
                      latitude={p?.lat}
                      anchor="left"
                      onClose={() => setCurrentPlaceId(null)}
                      closeOnClick={false}
                      closeButton={true}
                    >
                      <div className="card">
                        <label>Place</label>
                        <h4 className="place">{p?.title}</h4>
                        <label>Review</label>
                        <p className="desc">{p?.desc}</p>
                        <label>Rating</label>
                        <div className="stars">
                          {Array(p?.rating).fill(<StarIcon className="star" />)}
                        </div>
                        <label>Information</label>
                        <span className="username">
                          Created by <b>{p?.username}</b>
                        </span>
                        <span className="date">
                          <b>{format(p?.createdAt)}</b>
                        </span>
                        <button
                          className="submitButton"
                          onClick={() => {
                            deletePinHandler(p?._id);
                          }}
                        >
                          Delete Pin
                        </button>
                      </div>
                    </Popup>
                  )}
                </>
              );
            })}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            onClose={() => setNewPlace(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div>
              <form onSubmit={submitHandler}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter a title."
                  onChange={pinObjectChangeHandler}
                  name="title"
                />
                <label>Review</label>
                <textarea
                  placeholder="Describe about this place."
                  onChange={pinObjectChangeHandler}
                  name="desc"
                />
                <label>Rating</label>
                <select name="rating" onChange={pinObjectChangeHandler}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "25px",
          }}
        >
          <NavigationControl />
        </div>
        <Source id="polylineLayer" type="geojson" data={dataOne as any}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "red",
              "line-width": 3,
            }}
          />
        </Source>
        <Source id="polylineLayer2" type="geojson" data={dataTwo as any}>
          <Layer
            id="lineLayer2"
            type="line"
            source="my-data2"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "green",
              "line-width": 3,
            }}
          />
        </Source>
      </Map>
    </>
  );
}

export default MapPin;
