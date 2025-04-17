import { Component, type OnInit } from "@angular/core"

interface Gouvernorat {
  id: number
  nom: string
}

@Component({
  selector: "app-ensprofil",
  templateUrl: "./ensprofil.component.html",
  styleUrls: ["./ensprofil.component.css"],
})
export class EnsprofilComponent implements OnInit {
  // Informations de l'enseignant
  enseignantInfo = {
    nom: "Bribech",
    prenom: "Israa",
    dateNaissance: "1980-05-15",
    email: "israabribech2002@gmail.com",
    cin: "12345678",
    etatCivil: "celibataire",
    departement: "informatique",
    grade: "assistant",
    typeAssistantContractuel: "", // Nouvelle propriété pour le type d'assistant contractuel
    adresse: {
      rue: "15 Rue des Oliviers",
      codePostal: "1002",
      gouvernoratId: 23, // Tunis
      delegation: "Bab Bhar",
    },
    telephone: "55123456",
    photoUrl: "",
  }

  // États civils disponibles
  etatsCivils = [
    { id: "celibataire", label: "Célibataire" },
    { id: "marie", label: "Marié(e)" },
    { id: "divorce", label: "Divorcé(e)" },
  ]

  // Départements disponibles
  departements = [
    { id: "informatique", nom: "Informatique" },
    { id: "gestion", nom: "Gestion" },
    { id: "economique", nom: "Economique" },
  ]

  // Grades disponibles
  grades = [
    { id: "assistant", label: "Assistant" },
    { id: "maitre_assistant", label: "Maître assistant" },
    { id: "pes", label: "PES" },
    { id: "assistant_contractuel", label: "Assistant contractuel" },
    { id: "assistant_vacataire", label: "Assistant vacataire" },
  ]

  // Types d'assistant contractuel disponibles
  typesAssistantContractuel = [
    { id: "docteur", label: "Docteur" },
    { id: "doctorant", label: "Doctorant" },
  ]

  // Liste des gouvernorats
  gouvernorats: Gouvernorat[] = [
    { id: 1, nom: "Ariana" },
    { id: 2, nom: "Béja" },
    { id: 3, nom: "Ben Arous" },
    { id: 4, nom: "Bizerte" },
    { id: 5, nom: "Gabès" },
    { id: 6, nom: "Gafsa" },
    { id: 7, nom: "Jendouba" },
    { id: 8, nom: "Kairouan" },
    { id: 9, nom: "Kasserine" },
    { id: 10, nom: "Kébili" },
    { id: 11, nom: "Kef" },
    { id: 12, nom: "Mahdia" },
    { id: 13, nom: "Manouba" },
    { id: 14, nom: "Médenine" },
    { id: 15, nom: "Monastir" },
    { id: 16, nom: "Nabeul" },
    { id: 17, nom: "Sfax" },
    { id: 18, nom: "Sidi Bouzid" },
    { id: 19, nom: "Siliana" },
    { id: 20, nom: "Sousse" },
    { id: 21, nom: "Tataouine" },
    { id: 22, nom: "Tozeur" },
    { id: 23, nom: "Tunis" },
    { id: 24, nom: "Zaghouan" },
  ]

  // État de validation du formulaire
  formValide = false
  formSoumis = false
  erreurs: { [key: string]: string } = {}

  // Photo de profil
  photoPreview: string | ArrayBuffer | null = null

  constructor() {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  // Méthode pour gérer le changement de grade
  onGradeChange(): void {
    // Si le grade n'est pas "assistant_contractuel", réinitialiser le type
    if (this.enseignantInfo.grade !== "assistant_contractuel") {
      this.enseignantInfo.typeAssistantContractuel = "";
    }
  }

  // Méthode pour gérer le téléchargement de la photo de profil
  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]

      // Vérifier le type de fichier
      if (!file.type.match("image.*")) {
        alert("Veuillez sélectionner une image.")
        return
      }

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 5MB.")
        return
      }

      // Afficher l'aperçu de l'image
      const reader = new FileReader()
      reader.onload = (e) => {
        this.photoPreview = e.target?.result || null
      }
      reader.readAsDataURL(file)
    }
  }

  // Méthode pour valider le formulaire
  validerFormulaire(): boolean {
    this.erreurs = {}
    let valide = true

    // Valider le nom
    if (!this.enseignantInfo.nom.trim()) {
      this.erreurs["nom"] = "Le nom est obligatoire"
      valide = false
    }

    // Valider le prénom
    if (!this.enseignantInfo.prenom.trim()) {
      this.erreurs["prenom"] = "Le prénom est obligatoire"
      valide = false
    }

    // Valider la date de naissance
    if (!this.enseignantInfo.dateNaissance) {
      this.erreurs["dateNaissance"] = "La date de naissance est obligatoire"
      valide = false
    }

    // Valider l'email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(this.enseignantInfo.email)) {
      this.erreurs["email"] = "L'email n'est pas valide"
      valide = false
    }

    // Valider l'état civil
    if (!this.enseignantInfo.etatCivil) {
      this.erreurs["etatCivil"] = "L'état civil est obligatoire"
      valide = false
    }

    // Valider le département
    if (!this.enseignantInfo.departement) {
      this.erreurs["departement"] = "Le département est obligatoire"
      valide = false
    }

    // Valider le grade
    if (!this.enseignantInfo.grade) {
      this.erreurs["grade"] = "Le grade est obligatoire"
      valide = false
    }

    // Valider le type d'assistant contractuel si le grade est assistant_contractuel
    if (this.enseignantInfo.grade === "assistant_contractuel" && !this.enseignantInfo.typeAssistantContractuel) {
      this.erreurs["typeAssistantContractuel"] = "Le type d'assistant contractuel est obligatoire"
      valide = false
    }

    // Valider l'adresse
    if (!this.enseignantInfo.adresse.rue.trim()) {
      this.erreurs["rue"] = "La rue est obligatoire"
      valide = false
    }

    if (!this.enseignantInfo.adresse.codePostal.trim()) {
      this.erreurs["codePostal"] = "Le code postal est obligatoire"
      valide = false
    }

    if (!this.enseignantInfo.adresse.gouvernoratId) {
      this.erreurs["gouvernorat"] = "Le gouvernorat est obligatoire"
      valide = false
    }

    if (!this.enseignantInfo.adresse.delegation.trim()) {
      this.erreurs["delegation"] = "La délégation est obligatoire"
      valide = false
    }

    // Valider le téléphone
    const telRegex = /^[0-9]{8}$/
    if (!telRegex.test(this.enseignantInfo.telephone)) {
      this.erreurs["telephone"] = "Le numéro de téléphone doit contenir 8 chiffres"
      valide = false
    }

    return valide
  }

  // Méthode pour soumettre le formulaire
  soumettreFormulaire(): void {
    this.formSoumis = true

    if (this.validerFormulaire()) {
      this.formValide = true
      // Ici, vous pourriez envoyer les données à un service ou une API
      console.log("Formulaire soumis avec succès", this.enseignantInfo)

      // Simuler un délai pour montrer le message de succès
      setTimeout(() => {
        this.formSoumis = false
        this.formValide = false
        alert("Profil mis à jour avec succès !")
      }, 2000)
    } else {
      console.log("Formulaire invalide", this.erreurs)
    }
  }

  // Méthode pour obtenir le nom du gouvernorat à partir de son ID
  getNomGouvernorat(id: number): string {
    const gouvernorat = this.gouvernorats.find((g) => g.id === id)
    return gouvernorat ? gouvernorat.nom : ""
  }
}