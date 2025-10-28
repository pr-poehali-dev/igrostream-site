import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('all');

  const topStreamers = [
    {
      id: 1,
      name: 'ProGamer_RU',
      game: 'Counter-Strike 2',
      viewers: 12450,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/3adf0962-e1c3-4059-a749-eb2c18789f2f.jpg',
      isLive: true,
      tags: ['FPS', 'Киберспорт']
    },
    {
      id: 2,
      name: 'EliteStreamer',
      game: 'Dota 2',
      viewers: 8920,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/b73c03f9-33e0-42fe-b8a0-6fdbdf879c99.jpg',
      isLive: true,
      tags: ['MOBA', 'Турнир']
    },
    {
      id: 3,
      name: 'GamerGirl_Stream',
      game: 'Valorant',
      viewers: 6730,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/80b3eaa3-c4c9-4790-98be-571afe2e21e7.jpg',
      isLive: true,
      tags: ['FPS', 'Тактика']
    }
  ];

  const allStreams = [
    ...topStreamers,
    {
      id: 4,
      name: 'CasualGamer',
      game: 'Minecraft',
      viewers: 3200,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/3adf0962-e1c3-4059-a749-eb2c18789f2f.jpg',
      isLive: true,
      tags: ['Выживание', 'Строительство']
    },
    {
      id: 5,
      name: 'SpeedRunner_Pro',
      game: 'Elden Ring',
      viewers: 2850,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/b73c03f9-33e0-42fe-b8a0-6fdbdf879c99.jpg',
      isLive: true,
      tags: ['RPG', 'Спидран']
    },
    {
      id: 6,
      name: 'StrategyMaster',
      game: 'StarCraft II',
      viewers: 1940,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/80b3eaa3-c4c9-4790-98be-571afe2e21e7.jpg',
      isLive: true,
      tags: ['RTS', 'Стратегия']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Radio" className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  IgroStream.live
                </h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'all' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Все стримы
                </button>
                <Link
                  to="/rules"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Правила
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="outline" className="hidden sm:flex">
                Войти
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Icon name="Video" size={18} className="mr-2" />
                Начать стрим
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Топ стримеры</h2>
              <p className="text-muted-foreground">Самые популярные трансляции прямо сейчас</p>
            </div>
            <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-medium">{topStreamers.reduce((acc, s) => acc + s.viewers, 0).toLocaleString()} зрителей онлайн</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {topStreamers.map((streamer, index) => (
              <Card
                key={streamer.id}
                className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer relative"
              >
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 font-semibold">
                    #{index + 1} ТОП
                  </Badge>
                </div>
                
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={streamer.avatar}
                    alt={streamer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive" className="gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      LIVE
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm border-0">
                      <Icon name="Users" size={14} className="mr-1" />
                      {streamer.viewers.toLocaleString()}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{streamer.name[0]}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">{streamer.name}</h3>
                      <p className="text-sm text-muted-foreground truncate mb-2">{streamer.game}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {streamer.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Все стримы</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                Сортировка
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allStreams.map((streamer) => (
              <Card
                key={streamer.id}
                className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={streamer.avatar}
                    alt={streamer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive" className="gap-1 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      LIVE
                    </Badge>
                  </div>

                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm border-0 text-xs">
                      <Icon name="Users" size={12} className="mr-1" />
                      {streamer.viewers.toLocaleString()}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{streamer.name[0]}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">{streamer.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{streamer.game}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Radio" className="text-white" size={18} />
              </div>
              <span className="text-sm text-muted-foreground">© 2024 IgroStream.live</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/rules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Правила платформы
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Поддержка
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                О нас
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
