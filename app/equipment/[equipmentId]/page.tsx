import { notFound } from "next/navigation";
import { getEquipmentByIdAction } from "@/app/actions/equipment";
import { Container, Typography, Card, CardContent, Box, Chip, Button } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface EquipmentPageProps {
  params: Promise<{
    equipmentId: string;
  }>;
}

export default async function EquipmentPage({ params }: EquipmentPageProps) {
  const { equipmentId } = await params;

  const equipment = await getEquipmentByIdAction(equipmentId);

  if (!equipment) {
    notFound();
  }

  const formattedDate = new Date(equipment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        component="a"
        href="/equipment"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Equipment
      </Button>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Equipment Details
      </Typography>
      
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Name
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
              {equipment.name}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Owner
            </Typography>
            <Link href={`/user/${equipment.user._id}`}>
              <Typography variant="h6" sx={{ mt: 1, cursor: "pointer", color: "primary.main", textDecoration: "underline", "&:hover": { textDecoration: "underline" } }}>
                {equipment.user.username}
              </Typography>
            </Link>
            {equipment.user.email && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {equipment.user.email}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {equipment.description}
            </Typography>
          </Box>
          
          {equipment.brand && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary">
                Brand
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {equipment.brand}
              </Typography>
            </Box>
          )}
          
          {equipment.type && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary">
                Type
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {equipment.type}
              </Typography>
            </Box>
          )}
          
          {equipment.price && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary">
                Price
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {equipment.price}
              </Typography>
            </Box>
          )}
          
          {equipment.year && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary">
                Year
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {equipment.year}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Date Added
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formattedDate}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="text.secondary">
              Equipment ID
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {equipment._id}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
