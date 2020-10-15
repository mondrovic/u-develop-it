DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;


CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    industry_connected BOOLEAN NOT NULL,
    party_id INTEGER UNSIGNED,
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

CREATE TABLE voters (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- creates a table with a constraint where voter_id needs to be unique and
-- two foreign keys are created called voter_id which references the id column in voters table
-- and candidate_id which references the id column in candidates table
CREATE TABLE votes (
    id INTEGER PRIMARY KEY,
    voter_id INTEGER UNSIGNED NOT NULL,
    candidate_id INTEGER UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uc_voter UNIQUE (voter_id),
    CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
    CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
)