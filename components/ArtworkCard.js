import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";

export default function ArtworkCard({ objectID }) {
  const artworkLink = `/artwork/${objectID}`;
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data || isLoading) {
    return null;
  }

  return (
    <Card style={{ width: "18rem" }}>
      {data.primaryImageSmall ? (
        <Card.Img variant="top" src={data.primaryImageSmall} />
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        />
      )}
      <Card.Body>
        <Card.Title>{data.title ? <>{data.title}</> : <>N/A</>}</Card.Title>
        <Card.Text>
          {data.objectDate ? <p>{data.objectDate}</p> : <p>N/A</p>}
          {data.classification ? <p>{data.classification}</p> : <p>N/A</p>}
          {data.medium ? <p>{data.medium}</p> : <p>N/A</p>}
        </Card.Text>
        <Link href={artworkLink} passHref>
          <Button href={artworkLink} variant="outline-primary">
            {data.objectID}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
