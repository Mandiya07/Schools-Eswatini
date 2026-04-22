
# Schools Eswatini - Database Schema

This application is designed for a relational database (PostgreSQL recommended).

## Tables

### Users
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `password_hash`: String
- `full_name`: String
- `role`: Enum (super_admin, inst_admin)
- `institution_id`: UUID (Foreign Key, Nullable)
- `is_verified`: Boolean
- `created_at`: Timestamp

### Institutions
- `id`: UUID (Primary Key)
- `name`: String
- `slug`: String (Unique, Indexed)
- `region`: Enum (Hhohho, Manzini, Lubombo, Shiselweni)
- `type`: String[] (Primary, High School, Tertiary, etc.)
- `status`: Enum (pending, published, suspended)
- `is_verified`: Boolean
- `admin_id`: UUID (Foreign Key to Users.id)
- `logo_url`: String
- `cover_url`: String
- `contact_json`: JSONB (Address, Phone, Email, Website)
- `created_at`: Timestamp

### Pages/Sections
- `id`: UUID (Primary Key)
- `institution_id`: UUID (Foreign Key)
- `section_key`: String (homepage, about, admissions, etc.)
- `title`: String
- `content`: Text
- `is_enabled`: Boolean
- `media_urls`: String[]
- `updated_at`: Timestamp

### Analytics
- `id`: UUID (Primary Key)
- `institution_id`: UUID (Foreign Key)
- `view_count`: BigInt
- `application_count`: Int
- `last_activity`: Timestamp

## Relationships
- A **User** (Admin) manages exactly one **Institution**.
- An **Institution** has multiple **Sections** (mini-site pages).
- A **Super Admin** manages all **Institutions** and **Users**.
