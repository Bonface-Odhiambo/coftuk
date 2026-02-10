-- Create a table for fellowship member registrations
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a registration (public form)
CREATE POLICY "Anyone can submit member registration"
ON public.members
FOR INSERT
WITH CHECK (true);

-- Only admins can view all members
CREATE POLICY "Admins can view all members"
ON public.members
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update members
CREATE POLICY "Admins can update members"
ON public.members
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete members
CREATE POLICY "Admins can delete members"
ON public.members
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();