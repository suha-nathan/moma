import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const { data, error, isLoading } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data || isLoading) {
    return null;
  }

  return (
    <Card>
      {data.primaryImage ? (
        <Card.Img variant="top" src={data.primaryImage} />
      ) : null}
      <Card.Body>
        <Card.Title>
          {data.title ? <strong>{data.title}</strong> : <strong>N/A</strong>}
        </Card.Title>
        <Card.Text>
          <strong>Date: </strong> {data.objectDate ? data.objectDate : "N/A"}
          <br />
          <strong>Classification: </strong>
          {data.classification ? data.classification : "N/A"}
          <br />
          <strong>Medium: </strong> {data.medium ? data.medium : "N/A"}
          <br />
          <br />
          <strong>Artist: </strong>
          {data.artistDisplayName ? data.artistDisplayName : " N/A"} &#40;{" "}
          {data.artistDisplayName ? (
            <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
              wiki
            </a>
          ) : null}{" "}
          &#41;
          <br />
          <strong>Credit Line: </strong>{" "}
          {data.creditLine ? data.creditLine : "N/A"}
          <br />
          <strong>Dimensions: </strong>
          {data.dimensions ? data.dimensions : "N/A"}
          <br />
          <br />
          {showAdded ? (
            <Button variant="primary" onClick={favouritesClicked}>
              + Favourite &#40;added&#41;
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={favouritesClicked}>
              + Favourite
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
