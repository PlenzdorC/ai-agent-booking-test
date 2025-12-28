-- Add medical-specific fields to bookings table
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS patient_date_of_birth DATE,
ADD COLUMN IF NOT EXISTS insurance_provider VARCHAR(255),
ADD COLUMN IF NOT EXISTS reason_for_visit TEXT,
ADD COLUMN IF NOT EXISTS medical_history TEXT,
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS current_medications TEXT;

-- Add industry category to companies
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS industry VARCHAR(50) DEFAULT 'general';

-- Update test-dental to medical industry
UPDATE companies 
SET industry = 'medical'
WHERE slug = 'test-dental';

-- Create index for industry searches
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);

-- Add comments for documentation
COMMENT ON COLUMN bookings.patient_date_of_birth IS 'Medical only: Patient date of birth for age verification';
COMMENT ON COLUMN bookings.insurance_provider IS 'Medical only: Insurance provider name';
COMMENT ON COLUMN bookings.reason_for_visit IS 'Medical only: Chief complaint or reason for appointment';
COMMENT ON COLUMN bookings.medical_history IS 'Medical only: Relevant medical history';
COMMENT ON COLUMN bookings.allergies IS 'Medical only: Known allergies';
COMMENT ON COLUMN bookings.current_medications IS 'Medical only: Current medications';

