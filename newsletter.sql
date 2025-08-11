CREATE EXTENSION IF NOT EXISTS citext; -- for case-insensitive email

CREATE TABLE IF NOT EXISTS subscribers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email            CITEXT NOT NULL UNIQUE,
  status           TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'subscribed' | 'unsubscribed' | 'bounced'
  source           TEXT,                             -- e.g., 'popup'
  referer          TEXT,
  user_agent       TEXT,
  ip_hash          TEXT,                             -- store a hash, not raw IP
  verify_token     TEXT,                             -- for double opt-in
  verified_at      TIMESTAMP WITH TIME ZONE,
  created_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
