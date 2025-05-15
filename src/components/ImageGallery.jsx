import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ImageGallery = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      scrollContainer.classList.add('active');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      scrollContainer.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('mousedown', handleMouseDown);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('mouseup', handleMouseUp);
      scrollContainer.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('mousedown', handleMouseDown);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('mouseup', handleMouseUp);
        scrollContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const images = [
    {
      src: '/gallery/Docker-9th-birthday.JPG',
      alt: 'Docker 9th Birthday Celebration',
      caption: 'Docker 9th Birthday Community Celebration'
    },
    {
      src: '/gallery/k8s-forum-blr-2020.jpg',
      alt: 'Kubernetes Forum Bangalore',
      caption: 'Kubernetes Forum Bangalore 2020'
    },
    {
      src: '/gallery/CNCF-Thane.jpg',
      alt: 'CNCF Thane Event',
      caption: 'CNCF Community Event at Thane'
    },
    {
      src: '/gallery/CSA-Banglore-2023.jpg',
      alt: 'CSA Bangalore Event',
      caption: 'Cloud Security Alliance Bangalore 2023'
    },
    {
      src: '/gallery/Citrix-R&D.jpg',
      alt: 'Citrix R&D Event',
      caption: 'Cloud Native Session at Citrix R&D'
    },
    {
      src: '/gallery/DellEMC.jpg',
      alt: 'Dell EMC Event',
      caption: 'Container Technology Workshop at Dell EMC'
    },
    {
      src: '/gallery/DevRel-Docker_2016.jpg',
      alt: 'Docker DevRel 2016',
      caption: 'Docker Developer Relations Event 2016'
    },
    {
      src: '/gallery/Docker-Extension.JPG',
      alt: 'Docker Extension Workshop',
      caption: 'Docker Extension Development Workshop'
    },
    {
      src: '/gallery/Docker-Pune-2018.jpg',
      alt: 'Docker Pune 2018',
      caption: 'Docker Community Event Pune 2018'
    },
    {
      src: '/gallery/Docker-Pune-2023.jpg',
      alt: 'Docker Pune 2023',
      caption: 'Docker Community Event Pune 2023'
    },
    {
      src: '/gallery/GDG-Nagpur.jpg',
      alt: 'GDG Nagpur',
      caption: 'Google Developer Group Nagpur'
    },
    {
      src: '/gallery/GPS-Docker.jpg',
      alt: 'GPS Docker Event',
      caption: 'Docker Workshop at GPS'
    },
    {
      src: '/gallery/IMG_7612.JPG',
      alt: 'Community Event',
      caption: 'Cloud Native Community Meetup'
    },
    {
      src: '/gallery/JFROG_K8s.jpg',
      alt: 'JFrog Kubernetes Workshop',
      caption: 'JFrog Kubernetes Workshop'
    },
    {
      src: '/gallery/Jfrog.jpg',
      alt: 'JFrog Event',
      caption: 'Cloud Native Session at JFrog'
    },
    {
      src: '/gallery/KL_University.JPG',
      alt: 'KL University Event',
      caption: 'Cloud Native Workshop at KL University'
    },
    {
      src: '/gallery/Rakuten.JPG',
      alt: 'Rakuten Event',
      caption: 'Cloud Native Session at Rakuten'
    },
    {
      src: '/gallery/Rancher.jpg',
      alt: 'Rancher Event',
      caption: 'Kubernetes Workshop with Rancher'
    },
    {
      src: '/gallery/SAPLAB1.jpg',
      alt: 'SAP Labs Event',
      caption: 'Container Technology at SAP Labs'
    },
    {
      src: '/gallery/SAPLAB2020-team.jpg',
      alt: 'SAP Labs Team 2020',
      caption: 'SAP Labs Cloud Native Team 2020'
    },
    {
      src: '/gallery/SAP_LAB_AWARD.jpg',
      alt: 'SAP Labs Award',
      caption: 'Recognition at SAP Labs'
    },
    {
      src: '/gallery/SAP_LAB_KO_google.jpg',
      alt: 'SAP Labs Google Event',
      caption: 'SAP Labs & Google Cloud Event'
    },
    {
      src: '/gallery/VISA.jpg',
      alt: 'VISA Event',
      caption: 'Cloud Native Workshop at VISA'
    },
    {
      src: '/gallery/brainanalaytics.jpg',
      alt: 'Brain Analytics Event',
      caption: 'Tech Session at Brain Analytics'
    },
    {
      src: '/gallery/docker-on-aws-gps2017.jpg',
      alt: 'Docker on AWS GPS 2017',
      caption: 'Docker on AWS Workshop GPS 2017'
    },
    {
      src: '/gallery/mayadata.jpg',
      alt: 'MayaData Event',
      caption: 'Cloud Native Session at MayaData'
    },
    {
      src: '/gallery/microsoft-reactor.jpg',
      alt: 'Microsoft Reactor Event',
      caption: 'Cloud Native Workshop at Microsoft Reactor'
    },
    {
      src: '/gallery/okteto.jpg',
      alt: 'Okteto Event',
      caption: 'Cloud Development with Okteto'
    },
    {
      src: '/gallery/st-paloti-nagpur.JPG',
      alt: 'St. Paloti Nagpur',
      caption: 'Tech Workshop at St. Paloti Nagpur'
    },
    {
      src: '/gallery/thoughtworks.jpg',
      alt: 'ThoughtWorks Event',
      caption: 'Container Workshop at ThoughtWorks'
    },
    {
      src: '/gallery/walmartlabs.jpg',
      alt: 'Walmart Labs Event',
      caption: 'Cloud Native Session at Walmart Labs'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[95%] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Learn Together. Grow Together.
          </h2>
          <p className="mt-3 text-xl text-gray-600">
            A Journey Through Our Global Tech Community Events
          </p>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing scroll-smooth hide-scrollbar -mx-2 px-2"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="flex-none w-[280px] md:w-[320px] group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl scroll-snap-align-start"
            >
              <div className="relative pt-[66.67%]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-base font-semibold line-clamp-2">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Scroll or drag to explore more</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ImageGallery; 