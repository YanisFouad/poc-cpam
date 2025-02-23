<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Form\RecipeType;
use App\Repository\RecipeRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RecipeController extends AbstractController
{
    /**
     * @Route("/recette", name="recipe.index")
     */
    public function index(RecipeRepository $repository, EntityManagerInterface $em): Response
    {
        $recipes = $repository->findWithDurationLowerThan(20);

        return $this->render(
            'recipe/index.html.twig',
            [
                "recipes" => $recipes
            ]
        );
    }

    /**
     * @Route("/recette/{slug}-{id}", name="recipe.show", requirements={"id"="\d+", "slug"="[a-z0-9\-]+"})
     */
    public function show(string $slug, int $id, RecipeRepository $repository): Response
    {
        $recipe = $repository->find($id);

        if ($recipe->getSlug() !== $slug) {
            return $this->redirectToRoute('recipe.show', [
                'id' => $recipe->getId(),
                'slug' => $recipe->getSlug()
            ], 301);
        }
        return $this->render('recipe/show.html.twig', [
            'recipe' => $recipe,
            'slug' => $slug
        ]);
    }

    /**
     * @Route("/recette/{id}/edit", name="recipe.edit")
     */
    public function edit(Recipe $recipe, Request $request, EntityManagerInterface $em)
    {
        $form = $this->createForm(RecipeType::class, $recipe);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            $this->addFlash('success', 'La recette a été modifiée');

            return $this->redirectToRoute('recipe.show', [
                'slug' => $recipe->getSlug(),
                'id' => $recipe->getId()
            ]);
        }

        return $this->render('recipe/edit.html.twig', [
            'recipe' => $recipe,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/recette/new", name="recipe.new")
     */
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(RecipeType::class);
        $form->handleRequest($request);

        try {
            if ($form->isSubmitted() && $form->isValid()) {
                $recipe = $form->getData();
                $recipe->setCreatedAt(new DateTimeImmutable());
                $recipe->setUpdatedAt(new DateTimeImmutable());
                $em->persist($recipe);
                $em->flush();
                $this->addFlash('success', 'La recette a été créée');

                return $this->redirectToRoute('recipe.show', [
                    'slug' => $recipe->getSlug(),
                    'id' => $recipe->getId()
                ]);
            }
        } catch (\Throwable $th) {
            $this->addFlash('error', 'Erreur lors de la création de la recette');
            return $this->redirectToRoute('recipe.index');
        }

        return $this->render('recipe/new.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/recette/{id}/delete", name="recipe.delete", methods={"DELETE"})
     */
    public function delete(Recipe $recipe, EntityManagerInterface $em): Response
    {
        $em->remove($recipe);
        $em->flush();

        return $this->redirectToRoute("recipe.index");
    }
}
