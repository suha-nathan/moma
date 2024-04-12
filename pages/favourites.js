import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;

  if (!favouritesList || favouritesList.length == 0) {
    return (
      <div>
        <strong>Nothing Here</strong> Try adding some new artwork to the list
      </div>
    );
  }

  return (
    <Row className="gy-4">
      {favouritesList.map((artID) => (
        <Col lg={3} key={artID}>
          <ArtworkCard objectID={artID} />
        </Col>
      ))}
    </Row>
  );
}
