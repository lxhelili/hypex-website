'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, Users, Heart } from 'lucide-react'

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const reviews = [
    {
      name: 'Sarah M.',
      platform: 'Instagram',
      service: 'Follower + Likes',
      rating: 5,
      text: 'Wow! Innerhalb von 30 Minuten hatte ich 5.000 neue Follower. Der Service ist unglaublich schnell und die Qualität der Follower ist top. Mein Engagement ist durch die Decke gegangen!',
      result: '+5K Follower in 30 Min',
      avatar: '👩‍💼',
      verified: true
    },
    {
      name: 'Max K.',
      platform: 'Spotify Premium',
      service: 'Account Upgrade',
      rating: 5,
      text: 'Spotify Premium für 12 Monate zum Bruchteil des Preises! Der Upgrade hat sofort funktioniert und ich spare über 80€. Absolut genial!',
      result: '80€ gespart',
      avatar: '🎵',
      verified: true
    },
    {
      name: 'Lisa T.',
      platform: 'Google Maps',
      service: 'Business Bewertungen',
      rating: 5,
      text: 'Mein Restaurant hat jetzt 4.8 Sterne und deutlich mehr Reservierungen. Die Bewertungen wirken absolut authentisch und haben mein Business transformed.',
      result: '+300% Reservierungen',
      avatar: '🍽️',
      verified: true
    },
    {
      name: 'Tim R.',
      platform: 'TikTok',
      service: 'Video Views + Follower',
      rating: 5,
      text: 'Von 200 auf 15K Follower in einer Woche! Meine Videos gehen jetzt viral und ich bekomme sogar Brand-Deals angeboten. Hypex hat mein Leben verändert!',
      result: '+14.8K Follower',
      avatar: '🎬',
      verified: true
    },
    {
      name: 'Anna W.',
      platform: 'Google Knowledge Panel',
      service: 'Personal GKP',
      rating: 5,
      text: 'Als Anwältin war ein professionelles Knowledge Panel essential für mich. Hypex hat alles perfekt eingerichtet und meine Glaubwürdigkeit online ist jetzt viel stärker.',
      result: 'Professionelles GKP',
      avatar: '⚖️',
      verified: true
    },
    {
      name: 'Jonas B.',
      platform: 'Twitch',
      service: 'Follower + Channel Views',
      rating: 5,
      text: 'Streaming wurde endlich profitabel! Mit mehr Followern kommen mehr Zuschauer und dadurch auch mehr Donations. ROI war schon nach 2 Wochen erreicht.',
      result: '+2.5K Follower',
      avatar: '🎮',
      verified: true
    }
  ]

  const screenshots = [
    {
      title: 'Instagram Wachstum',
      before: '1.2K Follower',
      after: '15.8K Follower',
      timeframe: '7 Tage',
      platform: 'Instagram'
    },
    {
      title: 'Google Maps Erfolg',
      before: '3.1 ⭐ (15 Reviews)',
      after: '4.9 ⭐ (156 Reviews)',
      timeframe: '3 Wochen',
      platform: 'Google Maps'
    },
    {
      title: 'TikTok Viral',
      before: '850 Views/Video',
      after: '45.2K Views/Video',
      timeframe: '2 Wochen',
      platform: 'TikTok'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3))
  }

  const getVisibleReviews = () => {
    const startIndex = currentSlide * 3
    return reviews.slice(startIndex, startIndex + 3)
  }

  return (
    <section id="customer-reviews" className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Kundenbewertungen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Über 50.000 zufriedene Kunden vertrauen auf Hypex. 
            Hier sind echte Erfolgsgeschichten unserer Community.
          </p>
        </div>

        {/* Overall Rating */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">aus 12.847 Bewertungen</div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getVisibleReviews().map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center space-x-2">
                        <span>{review.name}</span>
                        {review.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{review.platform}</div>
                    </div>
                  </div>
                  
                  <Quote className="w-6 h-6 text-gray-300" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({review.rating}.0)</span>
                </div>

                {/* Service Badge */}
                <div className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {review.service}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  &quot;{review.text}&quot;
                </p>

                {/* Result */}
                <div className="bg-green-50 rounded-lg p-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 font-semibold text-sm">{review.result}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Success Screenshots */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Screenshots echter Ergebnisse
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Platform Badge */}
                <div className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {screenshot.platform}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6">{screenshot.title}</h4>

                {/* Before/After Comparison */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700 font-medium">Vorher:</span>
                    <span className="text-red-900 font-semibold">{screenshot.before}</span>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white">
                      ↓
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Nachher:</span>
                    <span className="text-green-900 font-semibold">{screenshot.after}</span>
                  </div>

                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800 font-semibold">in {screenshot.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2 flex items-center justify-center">
                <Users className="w-8 h-8 mr-2" />
                50K+
              </div>
              <div className="text-gray-600">Zufriedene Kunden</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2 flex items-center justify-center">
                <Heart className="w-8 h-8 mr-2" />
                99.8%
              </div>
              <div className="text-gray-600">Positive Bewertungen</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 mr-2" />
                1M+
              </div>
              <div className="text-gray-600">Gelieferte Services</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2 flex items-center justify-center">
                <Star className="w-8 h-8 mr-2" />
                4.9/5
              </div>
              <div className="text-gray-600">Durchschnittsbewertung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews