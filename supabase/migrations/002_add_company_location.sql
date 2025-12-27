-- Add location and additional fields to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS state VARCHAR(100),
ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'USA',
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20),
ADD COLUMN IF NOT EXISTS website VARCHAR(255),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing test company with location
UPDATE companies 
SET 
  city = 'New York',
  state = 'NY',
  country = 'USA',
  address = '123 Dental Street',
  postal_code = '10001',
  website = 'https://testdental.com',
  is_active = true
WHERE slug = 'test-dental';

-- Create index for location searches
CREATE INDEX IF NOT EXISTS idx_companies_city ON companies(city);
CREATE INDEX IF NOT EXISTS idx_companies_state ON companies(state);
CREATE INDEX IF NOT EXISTS idx_companies_active ON companies(is_active);

