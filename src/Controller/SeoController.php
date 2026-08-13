<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class SeoController extends AbstractController
{
    #[Route('/sitemap.xml', name: 'app_sitemap', methods: ['GET'])]
    public function sitemap(): Response
    {
        $urls = [
            [
                'loc' => $this->generateUrl('app_home', [], UrlGeneratorInterface::ABSOLUTE_URL),
                'lastmod' => '2026-08-12',
                'changefreq' => 'weekly',
                'priority' => '1.0',
            ],
        ];

        $response = $this->render('seo/sitemap.xml.twig', [
            'urls' => $urls,
        ]);
        $response->headers->set('Content-Type', 'application/xml; charset=UTF-8');

        return $response;
    }

    #[Route('/robots.txt', name: 'app_robots', methods: ['GET'])]
    public function robots(): Response
    {
        $content = implode("\n", [
            'User-agent: *',
            'Allow: /',
            'Disallow: /_profiler/',
            'Disallow: /_wdt/',
            'Sitemap: '.$this->generateUrl('app_sitemap', [], UrlGeneratorInterface::ABSOLUTE_URL),
            '',
        ]);

        return new Response($content, Response::HTTP_OK, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }
}
