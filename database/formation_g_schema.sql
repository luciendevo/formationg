-- Formation G CRM - Complete Database Schema
-- Compatible with PostgreSQL (Supabase) and MySQL
-- Created: 2025-01-11
-- Version: 1.0.0

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS & AUTHENTICATION
-- =============================================

-- Users table - Main user profiles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'instructor')),
    
    -- Profile Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('homme', 'femme', 'autre')),
    
    -- Address
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'France',
    
    -- Professional Information
    company VARCHAR(200),
    job_title VARCHAR(200),
    industry VARCHAR(100),
    experience_level VARCHAR(50) CHECK (experience_level IN ('debutant', 'intermediaire', 'avance', 'expert')),
    
    -- Account Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions for JWT management
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TRAINING SYSTEM
-- =============================================

-- Training categories
CREATE TABLE training_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- Hex color code
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training programs
CREATE TABLE trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES training_categories(id) ON DELETE SET NULL,
    
    -- Basic Information
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    
    -- Training Details
    duration_hours INTEGER NOT NULL,
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('debutant', 'intermediaire', 'avance')),
    max_participants INTEGER DEFAULT 20,
    language VARCHAR(10) DEFAULT 'fr',
    
    -- Pricing
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    cpf_eligible BOOLEAN DEFAULT TRUE,
    cpf_code VARCHAR(20),
    
    -- Content
    objectives TEXT[],
    prerequisites TEXT[],
    target_audience TEXT,
    certification VARCHAR(200),
    
    -- Media
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    brochure_url VARCHAR(500),
    
    -- SEO
    meta_title VARCHAR(200),
    meta_description VARCHAR(300),
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT FALSE,
    
    -- Ratings
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training sessions/schedules
CREATE TABLE training_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    training_id UUID NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Session Details
    title VARCHAR(200),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    
    -- Location
    location_type VARCHAR(20) CHECK (location_type IN ('online', 'onsite', 'hybrid')),
    location_address TEXT,
    online_meeting_url VARCHAR(500),
    
    -- Capacity
    max_participants INTEGER DEFAULT 20,
    current_participants INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CPF FORM SYSTEM
-- =============================================

-- CPF form submissions
CREATE TABLE cpf_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Form Status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed', 'approved', 'rejected')),
    completion_percentage INTEGER DEFAULT 0,
    current_step INTEGER DEFAULT 1,
    
    -- Submission Data (JSON for flexibility)
    form_data JSONB NOT NULL DEFAULT '{}',
    
    -- Scoring
    total_score INTEGER DEFAULT 0,
    category_scores JSONB DEFAULT '{}',
    recommended_category VARCHAR(50),
    
    -- Review Information
    reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewer_notes TEXT,
    
    -- Metadata
    submitted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CPF questions configuration
CREATE TABLE cpf_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Question Details
    category VARCHAR(50) NOT NULL,
    step_number INTEGER NOT NULL,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('text', 'textarea', 'select', 'radio', 'checkbox', 'number', 'date')),
    
    -- Options for select/radio/checkbox
    options JSONB,
    
    -- Validation
    required BOOLEAN DEFAULT FALSE,
    min_length INTEGER,
    max_length INTEGER,
    validation_pattern VARCHAR(500),
    
    -- Help & Guidance
    help_text TEXT,
    placeholder VARCHAR(200),
    
    -- Conditional Logic
    show_if JSONB, -- Conditions for showing this question
    
    -- Scoring
    scoring_rules JSONB,
    weight INTEGER DEFAULT 1,
    
    -- Status
    active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ENROLLMENT & PROGRESS
-- =============================================

-- User enrollments in training sessions
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES training_sessions(id) ON DELETE CASCADE,
    
    -- Enrollment Details
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped', 'cancelled')),
    
    -- Payment Information
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(50),
    amount_paid DECIMAL(10,2),
    cpf_funding BOOLEAN DEFAULT FALSE,
    
    -- Progress Tracking
    progress_percentage INTEGER DEFAULT 0,
    completion_date TIMESTAMP WITH TIME ZONE,
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(500),
    
    -- Ratings & Feedback
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    feedback_date TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, session_id)
);

-- =============================================
-- COMMUNICATION & NOTIFICATIONS
-- =============================================

-- Email templates
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(200) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    variables JSONB DEFAULT '[]',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification Content
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    
    -- Status
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ANALYTICS & REPORTING
-- =============================================

-- User activity logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Activity Details
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System metrics
CREATE TABLE system_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    dimensions JSONB DEFAULT '{}',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INITIAL DATA INSERTS
-- =============================================

-- Insert default training categories
INSERT INTO training_categories (name, slug, description, icon, color) VALUES
('Formation Web', 'formation-web', 'Développement web et technologies front-end/back-end', 'code', '#2F80ED'),
('Formation Data', 'formation-data', 'Science des données et intelligence artificielle', 'database', '#27AE60'),
('Formation Marketing', 'formation-marketing', 'Marketing digital et stratégies de communication', 'trending-up', '#F2994A'),
('Formation Management', 'formation-management', 'Leadership et gestion d''équipe', 'users', '#9B59B6'),
('Formation Design', 'formation-design', 'Design UX/UI et création graphique', 'palette', '#E74C3C');

-- Insert default email templates
INSERT INTO email_templates (name, subject, html_content, text_content, variables) VALUES
('welcome', 'Bienvenue chez Formation G', 
 '<h1>Bienvenue {{firstName}} !</h1><p>Merci de vous être inscrit sur Formation G CRM.</p>',
 'Bienvenue {{firstName}} ! Merci de vous être inscrit sur Formation G CRM.',
 '["firstName", "email"]'),
('cpf_submitted', 'Votre dossier CPF a été soumis', 
 '<h1>Dossier CPF soumis</h1><p>Bonjour {{firstName}}, votre dossier CPF a été soumis avec succès.</p>',
 'Bonjour {{firstName}}, votre dossier CPF a été soumis avec succès.',
 '["firstName", "submissionId"]'),
('enrollment_confirmed', 'Inscription confirmée', 
 '<h1>Inscription confirmée</h1><p>Votre inscription à {{trainingTitle}} est confirmée.</p>',
 'Votre inscription à {{trainingTitle}} est confirmée.',
 '["firstName", "trainingTitle", "sessionDate"]');

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- User dashboard summary
CREATE VIEW user_dashboard_summary AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    COUNT(DISTINCT e.id) as total_enrollments,
    COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.id END) as completed_trainings,
    COUNT(DISTINCT CASE WHEN cs.status = 'submitted' THEN cs.id END) as cpf_submissions,
    MAX(e.enrollment_date) as last_enrollment_date
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
LEFT JOIN cpf_submissions cs ON u.id = cs.user_id
WHERE u.role = 'user'
GROUP BY u.id, u.first_name, u.last_name, u.email;

-- Training statistics
CREATE VIEW training_statistics AS
SELECT 
    t.id,
    t.title,
    t.category_id,
    tc.name as category_name,
    COUNT(DISTINCT ts.id) as total_sessions,
    COUNT(DISTINCT e.id) as total_enrollments,
    COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.id END) as completed_enrollments,
    AVG(e.rating) as average_rating,
    COUNT(DISTINCT CASE WHEN e.rating IS NOT NULL THEN e.id END) as rating_count
FROM trainings t
LEFT JOIN training_categories tc ON t.category_id = tc.id
LEFT JOIN training_sessions ts ON t.id = ts.training_id
LEFT JOIN enrollments e ON ts.id = e.session_id
GROUP BY t.id, t.title, t.category_id, tc.name;

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_training_sessions_updated_at BEFORE UPDATE ON training_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cpf_submissions_updated_at BEFORE UPDATE ON cpf_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate CPF submission score
CREATE OR REPLACE FUNCTION calculate_cpf_score(submission_id UUID)
RETURNS INTEGER AS $$
DECLARE
    total_score INTEGER := 0;
    submission_data JSONB;
BEGIN
    SELECT form_data INTO submission_data FROM cpf_submissions WHERE id = submission_id;
    
    -- Add scoring logic here based on form_data
    -- This is a simplified example
    total_score := (submission_data->>'motivation_score')::INTEGER + 
                   (submission_data->>'experience_score')::INTEGER + 
                   (submission_data->>'availability_score')::INTEGER;
    
    UPDATE cpf_submissions SET total_score = total_score WHERE id = submission_id;
    
    RETURN total_score;
END;
$$ language 'plpgsql';

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Basic indexes for primary lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);

CREATE INDEX idx_categories_slug ON training_categories(slug);
CREATE INDEX idx_categories_active ON training_categories(active);

CREATE INDEX idx_trainings_category_id ON trainings(category_id);
CREATE INDEX idx_trainings_slug ON trainings(slug);
CREATE INDEX idx_trainings_status ON trainings(status);
CREATE INDEX idx_trainings_featured ON trainings(featured);
CREATE INDEX idx_trainings_cpf_eligible ON trainings(cpf_eligible);

CREATE INDEX idx_sessions_training_id ON training_sessions(training_id);
CREATE INDEX idx_sessions_instructor_id ON training_sessions(instructor_id);
CREATE INDEX idx_sessions_start_date ON training_sessions(start_date);
CREATE INDEX idx_sessions_status ON training_sessions(status);

CREATE INDEX idx_cpf_user_id ON cpf_submissions(user_id);
CREATE INDEX idx_cpf_status ON cpf_submissions(status);
CREATE INDEX idx_cpf_submitted_at ON cpf_submissions(submitted_at);
CREATE INDEX idx_cpf_reviewed_by ON cpf_submissions(reviewed_by);

CREATE INDEX idx_questions_category ON cpf_questions(category);
CREATE INDEX idx_questions_step ON cpf_questions(step_number);
CREATE INDEX idx_questions_active ON cpf_questions(active);

CREATE INDEX idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX idx_enrollments_session_id ON enrollments(session_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
CREATE INDEX idx_enrollments_payment_status ON enrollments(payment_status);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

CREATE INDEX idx_activity_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_action ON activity_logs(action);
CREATE INDEX idx_activity_resource_type ON activity_logs(resource_type);
CREATE INDEX idx_activity_created_at ON activity_logs(created_at);

CREATE INDEX idx_metrics_name ON system_metrics(metric_name);
CREATE INDEX idx_metrics_type ON system_metrics(metric_type);
CREATE INDEX idx_metrics_recorded_at ON system_metrics(recorded_at);

-- Additional composite indexes for common queries
CREATE INDEX idx_enrollments_user_status ON enrollments(user_id, status);
CREATE INDEX idx_cpf_submissions_user_status ON cpf_submissions(user_id, status);
CREATE INDEX idx_training_sessions_date_status ON training_sessions(start_date, status);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);

-- Full-text search indexes (PostgreSQL specific)
CREATE INDEX idx_trainings_search ON trainings USING gin(to_tsvector('french', title || ' ' || description));
CREATE INDEX idx_users_search ON users USING gin(to_tsvector('french', first_name || ' ' || last_name || ' ' || email));

-- =============================================
-- SECURITY POLICIES (Row Level Security)
-- =============================================

-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cpf_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_own_data ON users FOR ALL USING (auth.uid() = id);

-- Users can only see their own CPF submissions
CREATE POLICY cpf_own_submissions ON cpf_submissions FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own enrollments
CREATE POLICY enrollments_own_data ON enrollments FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own notifications
CREATE POLICY notifications_own_data ON notifications FOR ALL USING (auth.uid() = user_id);

-- Admins can see everything
CREATE POLICY admin_all_access ON users FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON TABLE users IS 'Main user profiles with authentication and profile information';
COMMENT ON TABLE trainings IS 'Training programs and courses offered by Formation G';
COMMENT ON TABLE cpf_submissions IS 'CPF form submissions with scoring and review workflow';
COMMENT ON TABLE enrollments IS 'User enrollments in training sessions with progress tracking';
COMMENT ON TABLE training_sessions IS 'Scheduled training sessions with instructor and location details';

-- End of Formation G CRM Database Schema
