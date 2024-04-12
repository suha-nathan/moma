import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function Artwork() {
  const router = useRouter();
  const id = router.query;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={id.objectID} />
      </Col>
    </Row>
  );
}
