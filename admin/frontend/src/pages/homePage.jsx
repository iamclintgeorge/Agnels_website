import React from "react";
import { useAuth } from "../services/useAuthCheck"; // Correct import
import SideAndNavBar from "../components/sideBar";

const HomePage = () => {
  const { loading, message, isAuthenticated } = useAuth(); // Use the hook correctly
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="text-black text-justify">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Tempor risus
          maecenas porttitor libero orci porttitor tortor. Praesent velit mollis
          semper senectus; lacus integer. Leo montes diam dictumst ligula mauris
          euismod. Tortor potenti sit sodales cras risus, consequat justo donec
          rhoncus. Suspendisse tortor cubilia commodo praesent nibh dis sodales
          sed. Leo arcu nascetur, feugiat nascetur suspendisse integer aliquet
          in. Viverra semper id consequat consequat purus eu lectus semper
          aliquam? Pretium tristique commodo iaculis platea in amet dis conubia
          lacinia. At sapien adipiscing; maecenas venenatis mattis morbi. Porta
          magna venenatis tortor eleifend himenaeos efficitur nullam. Convallis
          praesent laoreet habitant vitae rutrum fames donec nisl. Litora mattis
          nostra cubilia pharetra, etiam diam. Gravida nisl consectetur donec
          diam suspendisse, suspendisse efficitur ligula. Aliquet lobortis
          tellus mattis; at mus eget quis fringilla mus. Fermentum himenaeos
          nulla hendrerit malesuada justo. Platea mattis consequat nulla
          molestie erat tempor primis metus. Velit malesuada montes nascetur
          habitasse vestibulum praesent. Maximus nam fusce sem consequat id
          aptent sit. Tempor feugiat massa fusce libero fermentum non felis
          natoque. Massa vivamus sem potenti nec pretium potenti montes auctor.
          Dolor faucibus dolor pellentesque blandit donec sem sociosqu.
          Ultricies facilisi malesuada; fringilla libero cras aptent justo. Nec
          adipiscing sociosqu eleifend posuere vivamus condimentum. Mauris
          potenti libero orci non ut diam. Lobortis dis hendrerit feugiat aptent
          suscipit sem. Auctor vitae parturient ultricies natoque etiam egestas
          eros lorem. Vel posuere fringilla feugiat scelerisque eleifend eros
          sagittis. Lorem ipsum odor amet, consectetuer adipiscing elit. Tempor
          risus maecenas porttitor libero orci porttitor tortor. Praesent velit
          mollis semper senectus; lacus integer. Leo montes diam dictumst ligula
          mauris euismod. Tortor potenti sit sodales cras risus, consequat justo
          donec rhoncus. Suspendisse tortor cubilia commodo praesent nibh dis
          sodales sed. Leo arcu nascetur, feugiat nascetur suspendisse integer
          aliquet in. Viverra semper id consequat consequat purus eu lectus
          semper aliquam? Pretium tristique commodo iaculis platea in amet dis
          conubia lacinia. At sapien adipiscing; maecenas venenatis mattis
          morbi. Porta magna venenatis tortor eleifend himenaeos efficitur
          nullam. Convallis praesent laoreet habitant vitae rutrum fames donec
          nisl. Litora mattis nostra cubilia pharetra, etiam diam. Gravida nisl
          consectetur donec diam suspendisse, suspendisse efficitur ligula.
          Aliquet lobortis tellus mattis; at mus eget quis fringilla mus.
          Fermentum himenaeos nulla hendrerit malesuada justo. Platea mattis
          consequat nulla molestie erat tempor primis metus.
        </div>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
};

export default HomePage;
