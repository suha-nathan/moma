/**********************************************************************************
 * WEB422 – Assignment 6
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Padmanathan Suhasini Student ID: 116577222 Date: 10 April 2024
 *
 *********************************************************************************/

import { Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="MOMA"
        rounded
        fluid
      />

      <Row style={{ paddingTop: "1rem" }}>
        <Col md={6}>
          The Metropolitan Museum of Art, colloquially referred to as the Met,
          is an art museum in New York City. It is the largest art museum in the
          Americas and fourth-largest in the world. In 2023, the museum welcomed
          5,800,000 visitors, making it the most-visited museum in the United
          States and the second most visited art museum in the world, after the
          Louvre. In 2000, its permanent collection was said to have over two
          million works; it currently lists a total of 1.5 million objects. The
          collection is divided into 17 curatorial departments.
        </Col>
        <Col md={6}>
          The main building at 1000 Fifth Avenue, along the Museum Mile on the
          eastern edge of Central Park on Manhattan's Upper East Side, is by
          area one of the world's largest art museums. The first portion of the
          approximately 2-million-square-foot (190,000 m2) building was built in
          1880. A much smaller second location, The Cloisters at Fort Tryon Park
          in Upper Manhattan, contains an extensive collection of art,
          architecture, and artifacts from medieval Europe.
          <br />
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
          >
            Link to Wiki
          </a>
        </Col>
      </Row>
    </>
  );
}
