import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const StreamerProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, user: string, message: string, time: string}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const streamerData: Record<string, any> = {
    '1': {
      name: 'ProGamer_RU',
      game: 'Counter-Strike 2',
      viewers: 12450,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/3adf0962-e1c3-4059-a749-eb2c18789f2f.jpg',
      banner: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/03e36469-a8d5-4bb7-b469-7b43b7cdb6c8.jpg',
      followers: 45200,
      bio: 'Профессиональный игрок в CS2. Играю на высоком уровне, участвую в турнирах. Стримлю каждый день с 18:00 МСК.',
      tags: ['FPS', 'Киберспорт', 'Обучение'],
      isLive: true,
      totalViews: 2340000,
      streamHours: 1250
    },
    '2': {
      name: 'EliteStreamer',
      game: 'Dota 2',
      viewers: 8920,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/b73c03f9-33e0-42fe-b8a0-6fdbdf879c99.jpg',
      banner: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/03e36469-a8d5-4bb7-b469-7b43b7cdb6c8.jpg',
      followers: 32800,
      bio: 'Играю в Dota 2 на профессиональном уровне. Показываю лучшие моменты и учу играть.',
      tags: ['MOBA', 'Турнир', 'Pro'],
      isLive: true,
      totalViews: 1850000,
      streamHours: 980
    },
    '3': {
      name: 'GamerGirl_Stream',
      game: 'Valorant',
      viewers: 6730,
      avatar: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/80b3eaa3-c4c9-4790-98be-571afe2e21e7.jpg',
      banner: 'https://cdn.poehali.dev/projects/8465c509-f0ad-4cdf-9c45-c704cc1cf2a6/files/03e36469-a8d5-4bb7-b469-7b43b7cdb6c8.jpg',
      followers: 28500,
      bio: 'Valorant энтузиаст! Играю за разных агентов, показываю тактики и веселюсь с чатом.',
      tags: ['FPS', 'Тактика', 'Веселье'],
      isLive: true,
      totalViews: 1420000,
      streamHours: 720
    }
  };

  const streamer = streamerData[id || '1'];
  
  if (followerCount === 0) {
    setFollowerCount(streamer.followers);
  }
  
  if (avatar === '') {
    setAvatar(streamer.avatar);
  }
  
  if (nickname === '') {
    setNickname(streamer.name);
  }
  
  if (chatMessages.length === 0) {
    setChatMessages([
      { id: 1, user: 'Viewer123', message: 'Привет всем! 👋', time: '18:23' },
      { id: 2, user: 'ProPlayer', message: 'Отличная игра!', time: '18:24' },
      { id: 3, user: 'StreamFan', message: 'Когда следующий стрим?', time: '18:25' },
      { id: 4, user: 'GamerX', message: 'Лучший стример! 🔥', time: '18:26' },
    ]);
  }
  
  const handleFollowToggle = () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    setFollowerCount(prev => newFollowState ? prev + 1 : prev - 1);
    
    toast({
      title: newFollowState ? 'Подписка оформлена!' : 'Вы отписались',
      description: newFollowState 
        ? `Теперь вы подписаны на ${streamer.name}` 
        : `Вы отписались от ${streamer.name}`,
    });
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast({
          title: 'Аватар обновлён!',
          description: 'Ваш новый аватар успешно загружен',
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
    setTimeout(() => nicknameInputRef.current?.focus(), 0);
  };
  
  const handleNicknameSave = () => {
    if (nickname.trim()) {
      setIsEditingNickname(false);
      toast({
        title: 'Ник обновлён!',
        description: `Ваш новый ник: ${nickname}`,
      });
    }
  };
  
  const handleNicknameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNicknameSave();
    } else if (e.key === 'Escape') {
      setNickname(streamer.name);
      setIsEditingNickname(false);
    }
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          user: nickname,
          message: newMessage,
          time: time
        }
      ]);
      
      setNewMessage('');
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };
  
  const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clips = [
    {
      id: 1,
      title: 'Эпичный ace на Mirage',
      views: 125000,
      thumbnail: streamer.avatar,
      duration: '0:45'
    },
    {
      id: 2,
      title: '1v5 клатч в решающем раунде',
      views: 98000,
      thumbnail: streamer.avatar,
      duration: '1:32'
    },
    {
      id: 3,
      title: 'Лучшие моменты недели',
      views: 76000,
      thumbnail: streamer.avatar,
      duration: '5:24'
    }
  ];

  const schedule = [
    { day: 'Понедельник', time: '18:00 - 23:00' },
    { day: 'Вторник', time: '18:00 - 23:00' },
    { day: 'Среда', time: '18:00 - 23:00' },
    { day: 'Четверг', time: '18:00 - 23:00' },
    { day: 'Пятница', time: '19:00 - 02:00' },
    { day: 'Суббота', time: '16:00 - 02:00' },
    { day: 'Воскресенье', time: 'Выходной' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Radio" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IgroStream.live
              </h1>
            </Link>

            <Link to="/">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                К стримам
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="h-64 md:h-80 relative overflow-hidden">
          <img
            src={streamer.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-20 md:-mt-24">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-background overflow-hidden bg-gradient-to-br from-primary to-secondary">
                  <img
                    src={avatar}
                    alt={streamer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="text-center">
                    <Icon name="Camera" className="text-white mx-auto mb-2" size={32} />
                    <span className="text-white text-sm font-medium">Изменить аватар</span>
                  </div>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                {streamer.isLive && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    LIVE
                  </Badge>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {isEditingNickname ? (
                        <div className="flex items-center gap-2">
                          <Input
                            ref={nicknameInputRef}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onKeyDown={handleNicknameKeyDown}
                            className="text-3xl md:text-4xl font-bold h-auto py-1 px-2 max-w-md"
                          />
                          <Button size="sm" onClick={handleNicknameSave}>
                            <Icon name="Check" size={18} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setNickname(streamer.name);
                              setIsEditingNickname(false);
                            }}
                          >
                            <Icon name="X" size={18} />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h1 className="text-3xl md:text-4xl font-bold">{nickname}</h1>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={handleNicknameEdit}
                            className="opacity-60 hover:opacity-100"
                          >
                            <Icon name="Pencil" size={18} />
                          </Button>
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{streamer.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {streamer.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      variant={isFollowing ? 'outline' : 'default'}
                      onClick={handleFollowToggle}
                      className={!isFollowing ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : ''}
                    >
                      <Icon name={isFollowing ? 'Check' : 'UserPlus'} size={20} className="mr-2" />
                      {isFollowing ? 'Подписан' : 'Подписаться'}
                    </Button>
                    <Button size="lg" variant="outline">
                      <Icon name="Bell" size={20} />
                    </Button>
                    <Button size="lg" variant="outline">
                      <Icon name="Share2" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <Card className="bg-card/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{followerCount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Подписчиков</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">{streamer.viewers.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Сейчас смотрят</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">{(streamer.totalViews / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-muted-foreground">Просмотров</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-secondary">{streamer.streamHours}ч</div>
                      <div className="text-sm text-muted-foreground">Эфирного времени</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="stream" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="stream">
              <Icon name="Video" size={18} className="mr-2" />
              Стрим
            </TabsTrigger>
            <TabsTrigger value="clips">
              <Icon name="Film" size={18} className="mr-2" />
              Клипы
            </TabsTrigger>
            <TabsTrigger value="about">
              <Icon name="Info" size={18} className="mr-2" />
              О стримере
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stream" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center">
                      {streamer.isLive ? (
                        <div className="space-y-4">
                          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Icon name="Play" className="text-white" size={40} />
                          </div>
                          <div>
                            <div className="text-2xl font-bold mb-2">Трансляция идёт!</div>
                            <Badge variant="destructive" className="gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              {streamer.viewers.toLocaleString()} зрителей
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Icon name="VideoOff" className="text-muted-foreground mx-auto" size={64} />
                          <div className="text-xl text-muted-foreground">Стрим не активен</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{streamer.game}</h3>
                    <p className="text-muted-foreground text-sm">Стримим и общаемся с чатом</p>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="h-full flex flex-col">
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Icon name="MessageSquare" size={20} className="text-primary" />
                        Чат стрима
                      </h3>
                      <Badge variant="outline" className="gap-1">
                        <Icon name="Users" size={12} />
                        {streamer.viewers.toLocaleString()}
                      </Badge>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-[400px] max-h-[500px]">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="group hover:bg-muted/30 rounded-lg p-2 transition-colors">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-white">{msg.user[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm truncate">{msg.user}</span>
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                              </div>
                              <p className="text-sm break-words">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border">
                      <Input
                        placeholder="Написать сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleMessageKeyDown}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        <Icon name="Send" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="clips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clips.map(clip => (
                <Card key={clip.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all cursor-pointer">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Icon name="Play" className="text-white" size={28} />
                      </div>
                    </div>
                    <Badge variant="secondary" className="absolute bottom-2 right-2 bg-black/80 border-0">
                      {clip.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-1 truncate">{clip.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Eye" size={14} />
                      {clip.views.toLocaleString()} просмотров
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Icon name="User" size={20} className="text-primary" />
                  О стримере
                </h3>
                <p className="text-muted-foreground leading-relaxed">{streamer.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  Расписание стримов
                </h3>
                <div className="space-y-2">
                  {schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <span className="font-medium">{item.day}</span>
                      <span className="text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Gamepad2" size={20} className="text-primary" />
                  Основная игра
                </h3>
                <Badge variant="outline" className="text-base px-4 py-2">
                  {streamer.game}
                </Badge>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

export default StreamerProfile;