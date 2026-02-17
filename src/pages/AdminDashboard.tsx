import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  LayoutDashboard,
  Image as ImageIcon,
  Search,
  Save,
  UserPlus,
  Calendar,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";
import {
  Leader,
  GalleryImage,
  Member,
  type Event,
  Scripture,
  getLeaders,
  saveLeaders,
  getGalleryImages,
  saveGalleryImages,
  getMembers,
  saveMembers,
  getEvents,
  saveEvents,
  getScriptures,
  saveScriptures,
} from "@/lib/store";
import { Switch } from "@/components/ui/switch";

type TabValue = "leaders" | "gallery" | "members" | "events" | "scriptures";

const sidebarItems: { icon: typeof LayoutDashboard; label: string; tab: TabValue | null }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: null },
  { icon: Users, label: "Leadership", tab: "leaders" },
  { icon: ImageIcon, label: "Gallery", tab: "gallery" },
  { icon: UserPlus, label: "Members", tab: "members" },
  { icon: Calendar, label: "Events", tab: "events" },
  { icon: BookOpen, label: "Scriptures", tab: "scriptures" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabValue>("leaders");
  const { toast } = useToast();
  
  // Leaders state
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [leaderSearch, setLeaderSearch] = useState("");
  const [isLeaderDialogOpen, setIsLeaderDialogOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [leaderForm, setLeaderForm] = useState<Partial<Leader>>({});

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [imageForm, setImageForm] = useState<Partial<GalleryImage>>({});

  // Members state
  const [members, setMembers] = useState<Member[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [memberForm, setMemberForm] = useState<Partial<Member>>({});

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventSearch, setEventSearch] = useState("");
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<Partial<Event>>({});

  // Scriptures state
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [isScriptureDialogOpen, setIsScriptureDialogOpen] = useState(false);
  const [editingScripture, setEditingScripture] = useState<Scripture | null>(null);
  const [scriptureForm, setScriptureForm] = useState<Partial<Scripture>>({});

  // Check admin access
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  // Load data on mount
  useEffect(() => {
    setLeaders(getLeaders());
    setGalleryImages(getGalleryImages());
    setMembers(getMembers());
    setEvents(getEvents());
    setScriptures(getScriptures());
  }, []);

  const handleSidebarClick = (tab: TabValue | null) => {
    if (tab) setActiveTab(tab);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not admin
  if (!user || !isAdmin) {
    return null;
  }

  // --- Leaders Functions ---
  const filteredLeaders = leaders.filter(
    (leader) =>
      leader.name.toLowerCase().includes(leaderSearch.toLowerCase()) ||
      leader.role.toLowerCase().includes(leaderSearch.toLowerCase())
  );

  const openLeaderDialog = (leader?: Leader) => {
    if (leader) {
      setEditingLeader(leader);
      setLeaderForm(leader);
    } else {
      setEditingLeader(null);
      setLeaderForm({ name: "", role: "", course: "", phone: "", email: "", image: "", quote: "" });
    }
    setIsLeaderDialogOpen(true);
  };

  const saveLeader = () => {
    if (!leaderForm.name || !leaderForm.role) {
      toast({ title: "Missing Information", description: "Please fill in name and role.", variant: "destructive" });
      return;
    }

    let updated: Leader[];
    if (editingLeader) {
      updated = leaders.map((l) => l.id === editingLeader.id ? { ...l, ...leaderForm } as Leader : l);
      toast({ title: "Leader Updated", description: `${leaderForm.name}'s information has been updated.` });
    } else {
      const newLeader: Leader = {
        id: Date.now().toString(),
        name: leaderForm.name || "",
        role: leaderForm.role || "",
        course: leaderForm.course || "",
        phone: leaderForm.phone || "",
        email: leaderForm.email || "",
        image: leaderForm.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        quote: leaderForm.quote || "",
      };
      updated = [...leaders, newLeader];
      toast({ title: "Leader Added", description: `${leaderForm.name} has been added to the team.` });
    }
    setLeaders(updated);
    saveLeaders(updated);
    setIsLeaderDialogOpen(false);
  };

  const deleteLeader = (id: string) => {
    const leader = leaders.find((l) => l.id === id);
    const updated = leaders.filter((l) => l.id !== id);
    setLeaders(updated);
    saveLeaders(updated);
    toast({ title: "Leader Removed", description: `${leader?.name} has been removed.` });
  };

  // --- Gallery Functions ---
  const openGalleryDialog = (image?: GalleryImage) => {
    if (image) {
      setEditingImage(image);
      setImageForm(image);
    } else {
      setEditingImage(null);
      setImageForm({ src: "", title: "", description: "", category: "" });
    }
    setIsGalleryDialogOpen(true);
  };

  const saveImage = () => {
    if (!imageForm.src || !imageForm.title) {
      toast({ title: "Missing Information", description: "Please fill in image URL and title.", variant: "destructive" });
      return;
    }

    let updated: GalleryImage[];
    if (editingImage) {
      updated = galleryImages.map((i) => i.id === editingImage.id ? { ...i, ...imageForm } as GalleryImage : i);
      toast({ title: "Image Updated", description: `${imageForm.title} has been updated.` });
    } else {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        src: imageForm.src || "",
        title: imageForm.title || "",
        description: imageForm.description || "",
        category: imageForm.category || "General",
      };
      updated = [...galleryImages, newImage];
      toast({ title: "Image Added", description: `${imageForm.title} has been added to the gallery.` });
    }
    setGalleryImages(updated);
    saveGalleryImages(updated);
    setIsGalleryDialogOpen(false);
  };

  const deleteImage = (id: string) => {
    const image = galleryImages.find((i) => i.id === id);
    const updated = galleryImages.filter((i) => i.id !== id);
    setGalleryImages(updated);
    saveGalleryImages(updated);
    toast({ title: "Image Removed", description: `${image?.title} has been removed.` });
  };

  // --- Members Functions ---
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const openMemberDialog = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setMemberForm(member);
    } else {
      setEditingMember(null);
      setMemberForm({ name: "", email: "", phone: "", course: "", year: "", joinedDate: new Date().toISOString().split("T")[0] });
    }
    setIsMemberDialogOpen(true);
  };

  const saveMember = () => {
    if (!memberForm.name || !memberForm.email) {
      toast({ title: "Missing Information", description: "Please fill in name and email.", variant: "destructive" });
      return;
    }

    let updated: Member[];
    if (editingMember) {
      updated = members.map((m) => m.id === editingMember.id ? { ...m, ...memberForm } as Member : m);
      toast({ title: "Member Updated", description: `${memberForm.name}'s information has been updated.` });
    } else {
      const newMember: Member = {
        id: Date.now().toString(),
        name: memberForm.name || "",
        email: memberForm.email || "",
        phone: memberForm.phone || "",
        course: memberForm.course || "",
        year: memberForm.year || "",
        joinedDate: memberForm.joinedDate || new Date().toISOString().split("T")[0],
      };
      updated = [...members, newMember];
      toast({ title: "Member Added", description: `${memberForm.name} has been added.` });
    }
    setMembers(updated);
    saveMembers(updated);
    setIsMemberDialogOpen(false);
  };

  const deleteMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    saveMembers(updated);
    toast({ title: "Member Removed", description: `${member?.name} has been removed.` });
  };

  // --- Events Functions ---
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      event.location.toLowerCase().includes(eventSearch.toLowerCase())
  );

  const openEventDialog = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setEventForm(event);
    } else {
      setEditingEvent(null);
      setEventForm({ 
        title: "", 
        date: new Date().toISOString().split("T")[0], 
        time: "", 
        location: "", 
        description: "", 
        image: "",
        isRecurring: false,
        recurringPattern: "",
      });
    }
    setIsEventDialogOpen(true);
  };

  const saveEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time) {
      toast({ title: "Missing Information", description: "Please fill in title, date, and time.", variant: "destructive" });
      return;
    }

    let updated: Event[];
    if (editingEvent) {
      updated = events.map((e) => e.id === editingEvent.id ? { ...e, ...eventForm } as Event : e);
      toast({ title: "Event Updated", description: `${eventForm.title} has been updated.` });
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventForm.title || "",
        date: eventForm.date || new Date().toISOString().split("T")[0],
        time: eventForm.time || "",
        location: eventForm.location || "",
        description: eventForm.description || "",
        image: eventForm.image || "",
        isRecurring: eventForm.isRecurring || false,
        recurringPattern: eventForm.recurringPattern || "",
      };
      updated = [...events, newEvent];
      toast({ title: "Event Added", description: `${eventForm.title} has been added.` });
    }
    setEvents(updated);
    saveEvents(updated);
    setIsEventDialogOpen(false);
  };

  const deleteEvent = (id: string) => {
    const event = events.find((e) => e.id === id);
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
    toast({ title: "Event Removed", description: `${event?.title} has been removed.` });
  };

  // --- Scriptures Functions ---
  const openScriptureDialog = (scripture?: Scripture) => {
    if (scripture) {
      setEditingScripture(scripture);
      setScriptureForm(scripture);
    } else {
      setEditingScripture(null);
      setScriptureForm({ reference: "", text: "", isActive: false, createdAt: new Date().toISOString() });
    }
    setIsScriptureDialogOpen(true);
  };

  const saveScripture = () => {
    if (!scriptureForm.reference || !scriptureForm.text) {
      toast({ title: "Missing Information", description: "Please fill in reference and text.", variant: "destructive" });
      return;
    }

    let updated: Scripture[];
    if (editingScripture) {
      updated = scriptures.map((s) => s.id === editingScripture.id ? { ...s, ...scriptureForm } as Scripture : s);
      toast({ title: "Scripture Updated", description: `${scriptureForm.reference} has been updated.` });
    } else {
      const newScripture: Scripture = {
        id: Date.now().toString(),
        reference: scriptureForm.reference || "",
        text: scriptureForm.text || "",
        isActive: scriptureForm.isActive || false,
        createdAt: scriptureForm.createdAt || new Date().toISOString(),
      };
      updated = [...scriptures, newScripture];
      toast({ title: "Scripture Added", description: `${scriptureForm.reference} has been added.` });
    }
    setScriptures(updated);
    saveScriptures(updated);
    window.dispatchEvent(new Event('scripturesUpdated'));
    setIsScriptureDialogOpen(false);
  };

  const deleteScripture = (id: string) => {
    const scripture = scriptures.find((s) => s.id === id);
    const updated = scriptures.filter((s) => s.id !== id);
    setScriptures(updated);
    saveScriptures(updated);
    window.dispatchEvent(new Event('scripturesUpdated'));
    toast({ title: "Scripture Removed", description: `${scripture?.reference} has been removed.` });
  };

  const toggleScriptureActive = (id: string) => {
    const updated = scriptures.map((s) => ({
      ...s,
      isActive: s.id === id ? !s.isActive : false, // Only one can be active at a time
    }));
    setScriptures(updated);
    saveScriptures(updated);
    window.dispatchEvent(new Event('scripturesUpdated'));
    const scripture = updated.find((s) => s.id === id);
    if (scripture?.isActive) {
      toast({ title: "Scripture Activated", description: `${scripture.reference} is now displayed on the website.` });
    } else {
      toast({ title: "Scripture Deactivated", description: "Scripture has been hidden from the website." });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/30" />
            <div>
              <h2 className="font-serif font-bold text-foreground">R&H Admin</h2>
              <p className="text-xs text-muted-foreground">Fellowship Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSidebarClick(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  (item.tab === null && activeTab === "leaders") || item.tab === activeTab
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <LayoutDashboard className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Admin <span className="text-gradient-gold">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage leadership, gallery, members, and events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-xl">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{leaders.length}</p>
                <p className="text-sm text-muted-foreground">Leaders</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{galleryImages.length}</p>
                <p className="text-sm text-muted-foreground">Gallery Images</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <UserPlus className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{members.length}</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{events.length}</p>
                <p className="text-sm text-muted-foreground">Events</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{scriptures.length}</p>
                <p className="text-sm text-muted-foreground">Scriptures</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="leaders" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Leadership
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Members
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Events
            </TabsTrigger>
            <TabsTrigger value="scriptures" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">
              Scriptures
            </TabsTrigger>
          </TabsList>

          {/* Leaders Tab */}
          <TabsContent value="leaders" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search leaders..."
                  value={leaderSearch}
                  onChange={(e) => setLeaderSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => openLeaderDialog()} className="bg-gold hover:bg-gold-dark text-foreground gap-2 shadow-gold">
                <Plus className="w-4 h-4" />
                Add Leader
              </Button>
            </div>

            <div className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gold/5 border-b border-border">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Leader</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Role</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden md:table-cell">Course</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaders.map((leader) => (
                      <tr key={leader.id} className="border-b border-border last:border-0 hover:bg-gold/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={leader.image} alt={leader.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/20" />
                            <span className="font-medium text-foreground">{leader.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gold/10 text-gold-dark text-xs font-medium rounded-full">{leader.role}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{leader.course}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openLeaderDialog(leader)} className="hover:bg-gold/10 hover:text-gold">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteLeader(leader.id)} className="hover:bg-destructive/10 hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeaders.length === 0 && (
                <div className="py-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No leaders found</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openGalleryDialog()} className="bg-gold hover:bg-gold-dark text-foreground gap-2 shadow-gold">
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative bg-card rounded-xl overflow-hidden border border-border shadow-soft">
                  <div className="aspect-square">
                    <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" onClick={() => openGalleryDialog(image)} className="bg-white/20 hover:bg-white/40">
                      <Pencil className="w-4 h-4 text-white" />
                    </Button>
                    <Button size="icon" variant="secondary" onClick={() => deleteImage(image.id)} className="bg-white/20 hover:bg-red-500/80">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm text-foreground truncate">{image.title}</p>
                    <p className="text-xs text-muted-foreground">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => openMemberDialog()} className="bg-gold hover:bg-gold-dark text-foreground gap-2 shadow-gold">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </div>

            <div className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gold/5 border-b border-border">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Name</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden sm:table-cell">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden md:table-cell">Course</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden lg:table-cell">Year</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="border-b border-border last:border-0 hover:bg-gold/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{member.name}</td>
                        <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{member.email}</td>
                        <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{member.course}</td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{member.year}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openMemberDialog(member)} className="hover:bg-gold/10 hover:text-gold">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteMember(member.id)} className="hover:bg-destructive/10 hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredMembers.length === 0 && (
                <div className="py-12 text-center">
                  <UserPlus className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No members found</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => openEventDialog()} className="bg-gold hover:bg-gold-dark text-foreground gap-2 shadow-gold">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft">
                  {/* Event Banner/Image */}
                  {event.image ? (
                    <div className="relative h-40 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {event.isRecurring && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-gold text-xs font-semibold rounded-full text-foreground">
                          {event.recurringPattern}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-32 bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-gold/50" />
                      {event.isRecurring && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-gold text-xs font-semibold rounded-full text-foreground">
                          {event.recurringPattern}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-foreground mb-2">{event.title}</h3>
                    <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span>{new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 flex items-center justify-center text-gold">⏰</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 flex items-center justify-center text-gold">📍</span>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
                    )}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                      <Button variant="ghost" size="sm" onClick={() => openEventDialog(event)} className="hover:bg-gold/10 hover:text-gold">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)} className="hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="py-12 text-center bg-card rounded-2xl border border-border">
                <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No events found</p>
              </div>
            )}
          </TabsContent>

          {/* Scriptures Tab */}
          <TabsContent value="scriptures" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Manage daily scriptures for website visitors. Only one scripture can be active at a time.</p>
              <Button onClick={() => openScriptureDialog()} className="bg-gold hover:bg-gold-dark text-foreground gap-2 shadow-gold">
                <Plus className="w-4 h-4" />
                Add Scripture
              </Button>
            </div>

            <div className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gold/5 border-b border-border">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Reference</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden md:table-cell">Text</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scriptures.map((scripture) => (
                      <tr key={scripture.id} className="border-b border-border last:border-0 hover:bg-gold/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">{scripture.reference}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                          <p className="line-clamp-2 text-sm">{scripture.text}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Switch
                              checked={scripture.isActive}
                              onCheckedChange={() => toggleScriptureActive(scripture.id)}
                            />
                            <span className="text-xs text-muted-foreground">
                              {scripture.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openScriptureDialog(scripture)} className="hover:bg-gold/10 hover:text-gold">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteScripture(scripture.id)} className="hover:bg-destructive/10 hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {scriptures.length === 0 && (
                <div className="py-12 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No scriptures found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Leader Dialog */}
      <Dialog open={isLeaderDialogOpen} onOpenChange={setIsLeaderDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editingLeader ? "Edit Leader" : "Add New Leader"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input value={leaderForm.name || ""} onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })} placeholder="John Doe" className="mt-1.5" />
              </div>
              <div>
                <Label>Role/Position *</Label>
                <Input value={leaderForm.role || ""} onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })} placeholder="Chairperson" className="mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Course</Label>
                <Input value={leaderForm.course || ""} onChange={(e) => setLeaderForm({ ...leaderForm, course: e.target.value })} placeholder="Computer Science" className="mt-1.5" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input value={leaderForm.phone || ""} onChange={(e) => setLeaderForm({ ...leaderForm, phone: e.target.value })} placeholder="+254 712 345 678" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Email Address</Label>
              <Input type="email" value={leaderForm.email || ""} onChange={(e) => setLeaderForm({ ...leaderForm, email: e.target.value })} placeholder="john@tukenya.ac.ke" className="mt-1.5" />
            </div>
            <div>
              <Label>Profile Image URL</Label>
              <Input value={leaderForm.image || ""} onChange={(e) => setLeaderForm({ ...leaderForm, image: e.target.value })} placeholder="https://example.com/photo.jpg" className="mt-1.5" />
            </div>
            <div>
              <Label>Personal Quote</Label>
              <Textarea value={leaderForm.quote || ""} onChange={(e) => setLeaderForm({ ...leaderForm, quote: e.target.value })} placeholder="A brief inspirational quote..." className="mt-1.5" rows={2} />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsLeaderDialogOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-gold hover:bg-gold-dark text-foreground gap-2" onClick={saveLeader}>
                <Save className="w-4 h-4" />
                {editingLeader ? "Update" : "Add Leader"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editingImage ? "Edit Image" : "Add New Image"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Image URL *</Label>
              <Input value={imageForm.src || ""} onChange={(e) => setImageForm({ ...imageForm, src: e.target.value })} placeholder="https://example.com/image.jpg" className="mt-1.5" />
            </div>
            {imageForm.src && (
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={imageForm.src} alt="Preview" className="w-full h-40 object-cover" />
              </div>
            )}
            <div>
              <Label>Title *</Label>
              <Input value={imageForm.title || ""} onChange={(e) => setImageForm({ ...imageForm, title: e.target.value })} placeholder="Fellowship Gathering" className="mt-1.5" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={imageForm.description || ""} onChange={(e) => setImageForm({ ...imageForm, description: e.target.value })} placeholder="Brief description of the image..." className="mt-1.5" rows={2} />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={imageForm.category || ""} onChange={(e) => setImageForm({ ...imageForm, category: e.target.value })} placeholder="Fellowship, Worship, Ministry, etc." className="mt-1.5" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsGalleryDialogOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-gold hover:bg-gold-dark text-foreground gap-2" onClick={saveImage}>
                <Save className="w-4 h-4" />
                {editingImage ? "Update" : "Add Image"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Member Dialog */}
      <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editingMember ? "Edit Member" : "Add New Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input value={memberForm.name || ""} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} placeholder="John Doe" className="mt-1.5" />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" value={memberForm.email || ""} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} placeholder="john@tukenya.ac.ke" className="mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                <Input value={memberForm.phone || ""} onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })} placeholder="+254 712 345 678" className="mt-1.5" />
              </div>
              <div>
                <Label>Course</Label>
                <Input value={memberForm.course || ""} onChange={(e) => setMemberForm({ ...memberForm, course: e.target.value })} placeholder="Computer Science" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Year of Study</Label>
              <Input value={memberForm.year || ""} onChange={(e) => setMemberForm({ ...memberForm, year: e.target.value })} placeholder="Year 3" className="mt-1.5" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsMemberDialogOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-gold hover:bg-gold-dark text-foreground gap-2" onClick={saveMember}>
                <Save className="w-4 h-4" />
                {editingMember ? "Update" : "Add Member"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Event Title *</Label>
              <Input value={eventForm.title || ""} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Sunday Worship Service" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Input type="date" value={eventForm.date || ""} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Time *</Label>
                <Input value={eventForm.time || ""} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} placeholder="10:00 AM - 12:00 PM" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input value={eventForm.location || ""} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} placeholder="University Chapel" className="mt-1.5" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={eventForm.description || ""} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} placeholder="Brief description of the event..." className="mt-1.5" rows={2} />
            </div>
            <div>
              <Label>Event Banner/Card Image URL</Label>
              <Input value={eventForm.image || ""} onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })} placeholder="https://example.com/event-banner.jpg" className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">Add an image URL to display a banner for this event</p>
            </div>
            {eventForm.image && (
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={eventForm.image} alt="Preview" className="w-full h-32 object-cover" />
              </div>
            )}
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Recurring Event</Label>
                <p className="text-xs text-muted-foreground">This event repeats on a schedule</p>
              </div>
              <Switch 
                checked={eventForm.isRecurring || false} 
                onCheckedChange={(checked) => setEventForm({ ...eventForm, isRecurring: checked })} 
              />
            </div>
            {eventForm.isRecurring && (
              <div>
                <Label>Recurring Pattern</Label>
                <Input value={eventForm.recurringPattern || ""} onChange={(e) => setEventForm({ ...eventForm, recurringPattern: e.target.value })} placeholder="Every Sunday, Last Friday of Month, etc." className="mt-1.5" />
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsEventDialogOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-gold hover:bg-gold-dark text-foreground gap-2" onClick={saveEvent}>
                <Save className="w-4 h-4" />
                {editingEvent ? "Update" : "Add Event"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scripture Dialog */}
      <Dialog open={isScriptureDialogOpen} onOpenChange={setIsScriptureDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editingScripture ? "Edit Scripture" : "Add New Scripture"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Scripture Reference *</Label>
              <Input value={scriptureForm.reference || ""} onChange={(e) => setScriptureForm({ ...scriptureForm, reference: e.target.value })} placeholder="John 3:16" className="mt-1.5" />
            </div>
            <div>
              <Label>Scripture Text *</Label>
              <Textarea value={scriptureForm.text || ""} onChange={(e) => setScriptureForm({ ...scriptureForm, text: e.target.value })} placeholder="For God so loved the world..." className="mt-1.5" rows={4} />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Display on Website</Label>
                <p className="text-xs text-muted-foreground">Make this scripture visible to visitors</p>
              </div>
              <Switch 
                checked={scriptureForm.isActive || false} 
                onCheckedChange={(checked) => setScriptureForm({ ...scriptureForm, isActive: checked })} 
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsScriptureDialogOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-gold hover:bg-gold-dark text-foreground gap-2" onClick={saveScripture}>
                <Save className="w-4 h-4" />
                {editingScripture ? "Update" : "Add Scripture"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
