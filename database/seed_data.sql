-- Formation G CRM - Sample Data Seeder
-- This file contains realistic sample data for testing and development
-- Run after the main schema creation

-- =============================================
-- SAMPLE USERS DATA
-- =============================================

-- Insert admin user
INSERT INTO users (id, email, password_hash, role, first_name, last_name, phone, company, job_title, status, email_verified) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@formationg.fr', '$2b$10$rQZ8kZKjKjKjKjKjKjKjKOeJ8kZKjKjKjKjKjKjKjKjKjKjKjKjKj', 'admin', 'Admin', 'Formation G', '+33123456789', 'Formation G', 'Administrateur', 'active', true);

-- Insert sample users (first 10 of 50)
INSERT INTO users (email, password_hash, role, first_name, last_name, phone, date_of_birth, gender, address, city, postal_code, company, job_title, industry, experience_level, status, email_verified, created_at) VALUES
('marie.dupont@email.com', '$2b$10$rQZ8kZKjKjKjKjKjKjKjKOeJ8kZKjKjKjKjKjKjKjKjKjKjKjKjKj', 'user', 'Marie', 'Dupont', '+33123456701', '1985-03-15', 'femme', '12 rue de la Paix', 'Paris', '75001', 'Tech Solutions', 'Développeuse Web', 'Technologie', 'intermediaire', 'active', true, '2022-12-01 10:00:00+01'),
('jean.martin@email.com', '$2b$10$rQZ8kZKjKjKjKjKjKjKjKOeJ8kZKjKjKjKjKjKjKjKjKjKjKjKjKj', 'user', 'Jean', 'Martin', '+33123456702', '1990-07-22', 'homme', '45 avenue des Champs', 'Lyon', '69001', 'Digital Agency', 'Chef de Projet', 'Marketing', 'avance', 'active', true, '2022-12-02 14:30:00+01'),
('sophie.bernard@email.com', '$2b$10$rQZ8kZKjKjKjKjKjKjKjKOeJ8kZKjKjKjKjKjKjKjKjKjKjKjKjKj', 'user', 'Sophie', 'Bernard', '+33123456703', '1988-11-08', 'femme', '78 boulevard Saint-Germain', 'Marseille', '13001', 'Data Corp', 'Analyste de Données', 'Finance', 'intermediaire', 'active', true, '2022-12-03 09:15:00+01'),
('pierre.dubois@email.com', '$2b$10$rQZ8kZKjKjKjKjKjKjKjKOeJ8kZKjKjKjKjKjKjKjKjKjKjKjKjKj', 'user', 'Pierre', 'Dubois', '+33123456704', '1992-05-12', 'homme', '23 rue Victor Hugo', 'Toulouse', '31000', 'StartUp Inc', 'Product Manager', 'Technologie', 'debutant', 'active', true, '2022-12-04 16:45:00+01'),
('claire.rousseau@email.com', '$2b$10$rQZ8kZKjKjKjKjKjKjKjKOeJ8kZKjKjKjKjKjKjKjKjKjKjKjKjKj', 'user', 'Claire', 'Rousseau', '+33123456705', '1987-09-30', 'femme', '56 place de la République', 'Nice', '06000', 'Design Studio', 'UX Designer', 'Design', 'avance', 'active', true, '2022-12-05 11:20:00+01');

-- =============================================
-- SAMPLE TRAINING DATA
-- =============================================

-- Insert sample trainings
INSERT INTO trainings (title, slug, category_id, description, duration_hours, difficulty_level, price, cpf_eligible, status, featured, rating_average, rating_count, created_at) VALUES
('Développement Web Full Stack', 'dev-web-fullstack', (SELECT id FROM training_categories WHERE slug = 'formation-web'), 'Formation complète développement web avec React et Node.js', 120, 'intermediaire', 2500.00, true, 'published', true, 4.7, 23, '2022-12-01 10:00:00+01'),
('Data Science et IA', 'data-science-ia', (SELECT id FROM training_categories WHERE slug = 'formation-data'), 'Formation data science avec Python et machine learning', 150, 'avance', 3200.00, true, 'published', true, 4.8, 31, '2022-12-02 14:30:00+01'),
('Marketing Digital', 'marketing-digital', (SELECT id FROM training_categories WHERE slug = 'formation-marketing'), 'Maîtrisez le marketing digital et growth hacking', 80, 'intermediaire', 1800.00, true, 'published', false, 4.5, 18, '2022-12-03 09:15:00+01');

-- =============================================
-- SAMPLE CPF QUESTIONS (First 12 of 50)
-- =============================================

INSERT INTO cpf_questions (category, step_number, question_number, question_text, question_type, options, required, help_text, active, sort_order) VALUES
('profil_personnel', 1, 1, 'Quel est votre niveau d''études ?', 'select', '[{"value": "bac", "label": "Baccalauréat"}, {"value": "bac+2", "label": "Bac+2"}, {"value": "bac+3", "label": "Bac+3"}, {"value": "bac+5", "label": "Bac+5"}]', true, 'Niveau d''études le plus élevé', true, 1),
('profil_personnel', 1, 2, 'Secteur d''activité actuel ?', 'select', '[{"value": "tech", "label": "Tech"}, {"value": "finance", "label": "Finance"}, {"value": "sante", "label": "Santé"}]', true, 'Votre secteur professionnel', true, 2),
('objectifs_professionnels', 2, 3, 'Objectif principal ?', 'radio', '[{"value": "reconversion", "label": "Reconversion"}, {"value": "evolution", "label": "Évolution"}]', true, 'Votre objectif de formation', true, 3),
('competences', 3, 4, 'Niveau informatique ?', 'select', '[{"value": "debutant", "label": "Débutant"}, {"value": "avance", "label": "Avancé"}]', true, 'Auto-évaluation', true, 4);

-- End of sample data
