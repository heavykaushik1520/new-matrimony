import weddingImage from "../assets/images/destination-wedding2.jpeg";

const DestinationWeddingSection = () => {
  return (
    <section className="w-full bg-white px-6 py-12 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={weddingImage}
            alt="Destination wedding setup"
            className="w-full h-full max-h-[420px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-10">
          {/* English Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              DESTINATION WEDDING FACILITIES
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We proudly provide complete{" "}
              <span className="font-semibold">destination wedding arrangements</span>, 
              including venue selection, traditional ceremony setup, decoration, 
              hospitality, photography, and full event management.  
              Our team ensures that your special day becomes joyful, memorable, 
              and completely stress-free for you and your loved ones.
            </p>
          </div>

          {/* Marathi Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              डेस्टिनेशन वेडिंग सुविधा
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              आम्ही संपूर्ण <span className="font-semibold">डेस्टिनेशन वेडिंगची सुविधा</span> उपलब्ध करून देतो. 
              सुंदर ठिकाणांची निवड, पारंपारिक विधी, आकर्षक सजावट, अतिथी व्यवस्थापन, 
              फोटोग्राफी आणि संपूर्ण कार्यक्रमाचे नियोजन  
              प्रत्येक गोष्ट आम्ही मनापासून आणि व्यवस्थितपणे आयोजित करतो.  
              तुमचा लग्नाचा दिवस अविस्मरणीय आणि आनंददायी बनवणे हेच आमचे ध्येय आहे.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationWeddingSection;
