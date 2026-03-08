// Background Particles
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particle.style.animationDelay = Math.random() * 10 + 's';
                container.appendChild(particle);
            }
        }
        createParticles();

        // Quiz Data
        const questions = [
            {
                question: "Você já se sentiu sobrecarregado pela ansiedade?",
                options: ["Sim, frequentemente", "Às vezes", "Raramente", "Nunca"]
            },
            {
                question: "Gostaria de aprender técnicas comprovadas para gerenciar sua ansiedade?",
                options: ["Com certeza", "Talvez", "Não sei", "Não"]
            },
            {
                question: "Você está cansado de tentar lidar com a ansiedade sozinho?",
                options: ["Sim, exausto", "Um pouco", "Não muito", "Não"]
            },
            {
                question: "Está disposto a investir em sua saúde mental?",
                options: ["Definitivamente sim", "Provavelmente sim", "Não tenho certeza", "Não"]
            },
            {
                question: "Já tentou outros métodos sem sucesso?",
                options: ["Sim, vários", "Alguns", "Poucos", "Nenhum"]
            },
            {
                question: "Quer aprender estratégias práticas para viver mais feliz?",
                options: ["Muito", "Bastante", "Um pouco", "Não"]
            }
        ];

        let currentQuestion = 0;
        let answers = [];

        function initQuiz() {
            const container = document.getElementById('quizContent');
            container.innerHTML = '';
            
            questions.forEach((q, index) => {
                const qDiv = document.createElement('div');
                qDiv.className = 'question-container';
                qDiv.id = `question-${index}`;
                
                qDiv.innerHTML = `
                    <div class="question">
                        <div class="question-number">${index + 1}</div>
                        ${q.question}
                    </div>
                    <div class="options">
                        ${q.options.map((opt, i) => `
                            <div class="option" onclick="selectOption(${index}, ${i}, this)">
                                <div class="option-radio"></div>
                                <span>${opt}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                container.appendChild(qDiv);
            });
            
            // Add navigation
            const navDiv = document.createElement('div');
            navDiv.className = 'quiz-nav';
            navDiv.innerHTML = `
                <button class="quiz-btn" id="prevBtn" onclick="prevQuestion()">Anterior</button>
                <button class="quiz-btn" id="nextBtn" onclick="nextQuestion()">Próxima</button>
            `;
            container.appendChild(navDiv);
            
            showQuestion(0);
        }

        function showQuestion(index) {
            document.querySelectorAll('.question-container').forEach(q => q.classList.remove('active'));
            document.getElementById(`question-${index}`).classList.add('active');
            
            // Update progress
            const progress = ((index + 1) / questions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Update buttons
            document.getElementById('prevBtn').classList.toggle('active', index > 0);
            document.getElementById('nextBtn').classList.toggle('active', answers[index] !== undefined);
            document.getElementById('nextBtn').textContent = index === questions.length - 1 ? 'Ver Resultado' : 'Próxima';
            
            // Restore selection
            if (answers[index] !== undefined) {
                const options = document.querySelectorAll(`#question-${index} .option`);
                options[answers[index]].classList.add('selected');
            }
        }

        function selectOption(qIndex, optIndex, element) {
            answers[qIndex] = optIndex;
            
            // Visual feedback
            document.querySelectorAll(`#question-${qIndex} .option`).forEach(opt => opt.classList.remove('selected'));
            element.classList.add('selected');
            
            // Enable next
            document.getElementById('nextBtn').classList.add('active');
            
            // Auto advance after short delay
            setTimeout(() => {
                if (qIndex < questions.length - 1) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                }
            }, 500);
        }

        function nextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            } else if (answers.length === questions.length) {
                showResult();
            }
        }

        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
            }
        }

        function showResult() {
            document.getElementById('quizContent').style.display = 'none';
            document.querySelector('.quiz-progress').style.display = 'none';
            
            // Calculate score (higher index = lower score)
            const maxScore = questions.length * 3; // 3 is max index (0-3)
            const userScore = answers.reduce((a, b) => a + b, 0);
            const percentage = Math.round(100 - (userScore / maxScore * 100));
            
            document.getElementById('resultScore').textContent = percentage + '%';
            
            let text = '';
            if (percentage >= 80) {
                text = 'Você está no caminho certo! Este e-book foi feito exatamente para pessoas como você que estão prontas para transformar sua relação com a ansiedade.';
            } else if (percentage >= 50) {
                text = 'Você pode se beneficiar muito das técnicas deste e-book. Dê o primeiro passo hoje!';
            } else {
                text = 'Mesmo com poucos sintomas, as técnicas de prevenção e bem-estar deste e-book podem ajudar você a manter o equilíbrio.';
            }
            
            document.getElementById('resultText').textContent = text;
            document.getElementById('quizResult').classList.add('show');
        }

        initQuiz();

        // Countdown Timer
        function startCountdown() {
            let totalSeconds = 4 * 3600 + 32 * 60 + 15; // 4h 32m 15s
            
            setInterval(() => {
                totalSeconds--;
                if (totalSeconds < 0) totalSeconds = 4 * 3600 + 32 * 60 + 15; // Reset
                
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                
                document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
            }, 1000);
        }
        startCountdown();

        // Scroll Animations
        function observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.symptom-card, .chapter-card').forEach(el => {
                observer.observe(el);
            });
        }
        observeElements();

        // Smooth scroll for nav
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });