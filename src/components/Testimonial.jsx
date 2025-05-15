import React, { useRef, useEffect, useState } from 'react';

const Testimonial = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;
    let pauseTimeout;

    const handleMouseDown = (e) => {
      isDown = true;
      setIsPaused(true);
      scrollContainer.classList.add('active');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
      // Resume auto-scroll after 2 seconds of no interaction
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => setIsPaused(false), 2000);
    };

    const handleMouseUp = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
      // Resume auto-scroll after 2 seconds of no interaction
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => setIsPaused(false), 2000);
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = () => {
      if (!scrollContainer) return;
      setIsPaused(true);
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => setIsPaused(false), 2000);
    };

    const autoScroll = () => {
      if (!scrollContainer || isPaused) return;

      const cardWidth = 400; // Width of each testimonial card
      const gap = 32; // Gap between cards (8 * 4 = 32px from gap-8)
      const totalWidth = scrollContainer.scrollWidth;
      
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % 4; // 4 is the number of testimonials
        const scrollPosition = (cardWidth + gap) * nextIndex;
        
        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        return nextIndex;
      });
    };

    // Set up event listeners
    if (scrollContainer) {
      scrollContainer.addEventListener('mousedown', handleMouseDown);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('mouseup', handleMouseUp);
      scrollContainer.addEventListener('mousemove', handleMouseMove);
      scrollContainer.addEventListener('scroll', handleScroll);
      
      // Start auto-scrolling
      autoScrollInterval = setInterval(autoScroll, 5000); // Scroll every 5 seconds
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('mousedown', handleMouseDown);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('mouseup', handleMouseUp);
        scrollContainer.removeEventListener('mousemove', handleMouseMove);
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      clearInterval(autoScrollInterval);
      clearTimeout(pauseTimeout);
    };
  }, [isPaused]);

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What People Are Saying
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear from community leaders and advocates from around the world
          </p>
        </div>
        
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing scroll-smooth hide-scrollbar"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {/* First Testimonial */}
          <div className="flex-none w-[400px] bg-white rounded-lg shadow-lg overflow-hidden scroll-snap-align-start">
            <div className="px-6 py-8">
              <div className="flex items-center">
                <img
                  className="h-20 w-20 rounded-full"
                  src="https://media.licdn.com/dms/image/v2/C4D03AQFI1lg1H41Mrw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1603107322506?e=1752710400&v=beta&t=BcT9K6HE6vDLRTmgqSQwFXKVX-4RblW5xT8hzGQz8CU"
                  alt="Pablo Chico de Guzman"
                />
                <div className="ml-6">
                  <div className="text-xl font-medium text-gray-900">Pablo Chico de Guzman</div>
                  <div className="text-base text-gray-600">CTO at Okteto (YC W19)</div>
                  <div className="text-sm text-gray-500">Docker Community Leader • Kubernetes Advocate</div>
                </div>
              </div>
              <blockquote className="mt-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  "He has extensive knowledge about Go, Docker, Kubernetes and Okteto. As a community leader, he's has helped to spread these technologies with the Indian community. In particular, he created great Okteto meetups and events. All of this without forgetting about social responsibility"
                </p>
              </blockquote>
            </div>
          </div>

          {/* Second Testimonial */}
          <div className="flex-none w-[400px] bg-white rounded-lg shadow-lg overflow-hidden scroll-snap-align-start">
            <div className="px-6 py-8">
              <div className="flex items-center">
                <img
                  className="h-20 w-20 rounded-full"
                  src="https://media.licdn.com/dms/image/v2/D5603AQHmAKQ6tiJ2Dw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720591406490?e=1752710400&v=beta&t=5s0mulM5zMyy6eVS-2yEeryMwbkcXRuIfBwxBD5xIIY"
                  alt="Ramiro Berrelleza"
                />
                <div className="ml-6">
                  <div className="text-xl font-medium text-gray-900">Ramiro Berrelleza</div>
                  <div className="text-base text-gray-600">Founder and CEO at Okteto</div>
                  <div className="text-sm text-gray-500">Cloud Native Computing Foundation • Ambassador</div>
                </div>
              </div>
              <blockquote className="mt-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  "Sangam has been a fantastic partner as the community leader of Okteto. He's passionate about tech, has extensive knowledge of emerging technologies, is a great educator, an a world class organizer. He has been instrumental in the growth of the Cloud Native meetups in Bangalore by creating content, fostering communities and organizing conferences."
                </p>
              </blockquote>
            </div>
          </div>

          {/* Third Testimonial */}
          <div className="flex-none w-[400px] bg-white rounded-lg shadow-lg overflow-hidden scroll-snap-align-start">
            <div className="px-6 py-8">
              <div className="flex items-center">
                <img
                  className="h-20 w-20 rounded-full"
                  src="https://media.licdn.com/dms/image/v2/D5603AQGD_El6BQ8jJA/profile-displayphoto-shrink_400_400/B56ZPFxNfSHIAg-/0/1734189833582?e=1752710400&v=beta&t=gYvae0vX3l4oK3mwjGEpSKyw8KwB8a-nCqUVE5fnNrI"
                  alt="Ajeet Singh Raina"
                />
                <div className="ml-6">
                  <div className="text-xl font-medium text-gray-900">Ajeet Singh Raina</div>
                  <div className="text-base text-gray-600">Developer Advocate at Docker</div>
                  <div className="text-sm text-gray-500">Docker Captain • Community Leader</div>
                </div>
              </div>
              <blockquote className="mt-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  "Sangam is very active Docker community leader as well as blogger. I met Sangam through the community engagement programme and found him actively participating in Meetup and conferences. He is passionate about Docker, Kubernetes & related container technologies. He showed a great rigor in contributing towards DockerLabs, KubeLabs and GopherLabs. He is quite active in community webinars too. Thanks Sangam for the awesome work you have been doing for the community. Keep it up!"
                </p>
              </blockquote>
            </div>
          </div>

          {/* Fourth Testimonial */}
          <div className="flex-none w-[400px] bg-white rounded-lg shadow-lg overflow-hidden scroll-snap-align-start">
            <div className="px-6 py-8">
              <div className="flex items-center">
                <img
                  className="h-20 w-20 rounded-full"
                  src="https://media.licdn.com/dms/image/v2/D5603AQHpLCCaruTyqw/profile-displayphoto-shrink_400_400/B56ZQlZgMWHQAg-/0/1735794230723?e=1752710400&v=beta&t=ImlVcOEzD9NgbViqArZ6X-lSoFqEUmzNFM8z1S5PW1E"
                  alt="Atul Deshpande"
                />
                <div className="ml-6">
                  <div className="text-xl font-medium text-gray-900">Atul Deshpande</div>
                  <div className="text-base text-gray-600">Principal Chief Architect- Telco Office of the CTO (Global)</div>
                  <div className="text-sm text-gray-500">MIEEE • MComSoc • MCompSoc • MACM • MIET</div>
                </div>
              </div>
              <blockquote className="mt-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  "I met Sangam at Docker Bengaluru Event couple of years back. He's speaker at the event and delivered a great talk about Okteto Development Platform on K8s. We later connected offline and met at multiple Bengaluru CNCF, K8s and Open-Source events over years. He is incredibly knowledgeable, talented, energetic and a great contributor towards CNCF Projects, esp. K8s, Okteto and many others. If I need any help on K8s or any CNCF project, first person I reach out to is Sangam and he never disappointed me. I simply admire his passion about CNCF and Open-Source. Moreover, his style of delivering keynotes in unique where he tries to give value back to community. You will always remember his talks."
                </p>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Scroll Indicator and Navigation Dots */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="text-sm text-gray-500">
            ← Scroll or drag to see more testimonials →
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-gray-800 w-4' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex(index);
                  scrollRef.current?.scrollTo({
                    left: index * (400 + 32),
                    behavior: 'smooth'
                  });
                  setTimeout(() => setIsPaused(false), 2000);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
};

export default Testimonial; 